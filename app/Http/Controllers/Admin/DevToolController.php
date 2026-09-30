<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;

class DevToolController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/DevTool/Index', [
            'systemInfo' => $this->getSystemInfo(),
            'migrations' => $this->getMigrationsData(),
            'tables' => $this->getTablesData(),
            'recentLogs' => $this->getRecentLogs(),
            'gitInfo' => $this->getGitInfo(),
        ]);
    }

    public function execute(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'command' => 'required|string',
        ]);

        $cmd = $validated['command'];

        // Git commands whitelist
        $gitCommands = [
            'git:status' => ['git', 'status'],
            'git:pull' => ['git', 'pull'],
            'git:fetch' => ['git', 'fetch'],
            'git:log' => ['git', 'log', '-n', '10', '--oneline'],
        ];

        if (isset($gitCommands[$cmd])) {
            $start = microtime(true);
            try {
                $process = new Process($gitCommands[$cmd], base_path());
                $process->setTimeout(120);
                $process->run();

                $output = $process->getOutput() ?: $process->getErrorOutput();
                $exitCode = $process->getExitCode() ?? ($process->isSuccessful() ? 0 : 1);
                $duration = round((microtime(true) - $start) * 1000, 2);

                return response()->json([
                    'success' => $process->isSuccessful(),
                    'command' => implode(' ', $gitCommands[$cmd]),
                    'output' => trim($output) !== '' ? $output : "Perintah '" . implode(' ', $gitCommands[$cmd]) . "' selesai dengan kode status {$exitCode}.",
                    'duration_ms' => $duration,
                    'exit_code' => $exitCode,
                    'fresh_migrations' => $this->getMigrationsData(),
                    'fresh_tables' => $this->getTablesData(),
                    'fresh_git' => $this->getGitInfo(),
                ]);
            } catch (\Throwable $e) {
                $duration = round((microtime(true) - $start) * 1000, 2);
                return response()->json([
                    'success' => false,
                    'command' => implode(' ', $gitCommands[$cmd]),
                    'output' => "Error saat menjalankan git: " . $e->getMessage(),
                    'duration_ms' => $duration,
                    'exit_code' => 1,
                ], 500);
            }
        }

        // Allowed safe artisan commands whitelist
        $allowed = [
            'migrate' => ['migrate', ['--force' => true]],
            'migrate:status' => ['migrate:status', []],
            'migrate:rollback' => ['migrate:rollback', ['--step' => 1, '--force' => true]],
            'db:seed' => ['db:seed', ['--force' => true]],
            'optimize:clear' => ['optimize:clear', []],
            'config:cache' => ['config:cache', []],
            'config:clear' => ['config:clear', []],
            'route:cache' => ['route:cache', []],
            'route:clear' => ['route:clear', []],
            'view:cache' => ['view:cache', []],
            'view:clear' => ['view:clear', []],
            'cache:clear' => ['cache:clear', []],
            'storage:link' => ['storage:link', []],
            'about' => ['about', []],
        ];

        if (!isset($allowed[$cmd])) {
            return response()->json([
                'success' => false,
                'command' => $cmd,
                'output' => "Perintah '{$cmd}' tidak diizinkan demi keamanan sistem.",
                'duration_ms' => 0,
                'exit_code' => 1,
            ], 403);
        }

        [$artisanCmd, $params] = $allowed[$cmd];

        $start = microtime(true);
        try {
            $exitCode = Artisan::call($artisanCmd, $params);
            $output = Artisan::output();
            $duration = round((microtime(true) - $start) * 1000, 2);

            return response()->json([
                'success' => $exitCode === 0,
                'command' => 'php artisan ' . $cmd,
                'output' => trim($output) !== '' ? $output : "Perintah '{$cmd}' berhasil dijalankan dengan kode status 0 (sukses).",
                'duration_ms' => $duration,
                'exit_code' => $exitCode,
                'fresh_migrations' => $this->getMigrationsData(),
                'fresh_tables' => $this->getTablesData(),
                'fresh_git' => $this->getGitInfo(),
            ]);
        } catch (\Throwable $e) {
            $duration = round((microtime(true) - $start) * 1000, 2);
            return response()->json([
                'success' => false,
                'command' => 'php artisan ' . $cmd,
                'output' => "Error saat menjalankan perintah: " . $e->getMessage(),
                'duration_ms' => $duration,
                'exit_code' => 1,
            ], 500);
        }
    }

    public function clearLog(): JsonResponse
    {
        $logPath = storage_path('logs/laravel.log');
        if (File::exists($logPath)) {
            File::put($logPath, '');
        }

        return response()->json([
            'success' => true,
            'message' => 'File log berhasil dikosongkan.',
            'recentLogs' => 'File log kosong.',
        ]);
    }

    public function refreshLogs(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'recentLogs' => $this->getRecentLogs(),
        ]);
    }

    private function getGitInfo(): array
    {
        $gitDir = base_path('.git');
        if (!File::exists($gitDir)) {
            return [
                'is_git_repo' => false,
                'message' => 'Direktori .git tidak ditemukan di root proyek.',
            ];
        }

        try {
            $branch = $this->runProcess(['git', 'rev-parse', '--abbrev-ref', 'HEAD']) ?: 'main';
            $remoteUrl = $this->runProcess(['git', 'config', '--get', 'remote.origin.url']) ?: '';

            // Clean GitHub repo name and URL
            $cleanRepoName = null;
            $cleanWebUrl = null;
            if (preg_match('#github\.com[:/]([^/]+/[^/]+?)(\.git)?$#', $remoteUrl, $matches)) {
                $cleanRepoName = $matches[1];
                $cleanWebUrl = 'https://github.com/' . $cleanRepoName;
            }

            // Latest commit info
            $commitRaw = $this->runProcess(['git', 'log', '-1', '--pretty=format:%h|%H|%an|%cr|%s']) ?: '';
            $commitHash = '';
            $commitFullHash = '';
            $commitAuthor = '';
            $commitDate = '';
            $commitMessage = '';

            if (!empty($commitRaw)) {
                $parts = explode('|', $commitRaw, 5);
                $commitHash = $parts[0] ?? '';
                $commitFullHash = $parts[1] ?? '';
                $commitAuthor = $parts[2] ?? '';
                $commitDate = $parts[3] ?? '';
                $commitMessage = $parts[4] ?? '';
            }

            // Status info
            $statusRaw = $this->runProcess(['git', 'status', '-s']) ?: '';
            $isClean = trim($statusRaw) === '';
            $modifiedCount = 0;
            $untrackedCount = 0;
            $changesList = [];

            if (!$isClean) {
                $lines = explode("\n", trim($statusRaw));
                foreach ($lines as $line) {
                    $trimmed = trim($line);
                    if (empty($trimmed)) continue;
                    if (str_starts_with($trimmed, '??')) {
                        $untrackedCount++;
                        $changesList[] = [
                            'type' => 'untracked',
                            'file' => trim(substr($trimmed, 2)),
                        ];
                    } else {
                        $modifiedCount++;
                        $changesList[] = [
                            'type' => 'modified',
                            'file' => trim(substr($trimmed, 2)),
                        ];
                    }
                }
            }

            // Recent 5 commits
            $recentCommitsRaw = $this->runProcess(['git', 'log', '-n', '5', '--pretty=format:%h|%an|%cr|%s']) ?: '';
            $recentCommits = [];
            if (!empty($recentCommitsRaw)) {
                $lines = explode("\n", trim($recentCommitsRaw));
                foreach ($lines as $line) {
                    $parts = explode('|', trim($line), 4);
                    if (count($parts) === 4) {
                        $recentCommits[] = [
                            'hash' => $parts[0],
                            'author' => $parts[1],
                            'date' => $parts[2],
                            'message' => $parts[3],
                        ];
                    }
                }
            }

            return [
                'is_git_repo' => true,
                'branch' => $branch,
                'remote_url' => $remoteUrl,
                'repo_name' => $cleanRepoName,
                'github_url' => $cleanWebUrl,
                'commit_hash' => $commitHash,
                'commit_full_hash' => $commitFullHash,
                'commit_author' => $commitAuthor,
                'commit_date' => $commitDate,
                'commit_message' => $commitMessage,
                'is_clean' => $isClean,
                'modified_count' => $modifiedCount,
                'untracked_count' => $untrackedCount,
                'changes' => array_slice($changesList, 0, 20),
                'recent_commits' => $recentCommits,
            ];
        } catch (\Throwable $e) {
            return [
                'is_git_repo' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    private function runProcess(array $command, int $timeout = 60): ?string
    {
        try {
            $process = new Process($command, base_path());
            $process->setTimeout($timeout);
            $process->run();

            return $process->isSuccessful() ? trim($process->getOutput()) : null;
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function getSystemInfo(): array
    {
        $freeDisk = @disk_free_space(base_path());
        $totalDisk = @disk_total_space(base_path());

        return [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'app_env' => config('app.env'),
            'app_debug' => (bool) config('app.debug'),
            'app_url' => config('app.url'),
            'db_connection' => config('database.default'),
            'db_name' => config('database.connections.' . config('database.default') . '.database'),
            'server_os' => PHP_OS,
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP ' . PHP_VERSION . ' (CLI / Local Server)',
            'timezone' => config('app.timezone'),
            'storage_linked' => file_exists(public_path('storage')),
            'disk_free' => $freeDisk ? round($freeDisk / (1024 * 1024 * 1024), 2) . ' GB' : 'N/A',
            'disk_total' => $totalDisk ? round($totalDisk / (1024 * 1024 * 1024), 2) . ' GB' : 'N/A',
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time') ? ini_get('max_execution_time') . 's' : 'Unlimited',
        ];
    }

    private function getMigrationsData(): array
    {
        try {
            $ranMigrations = DB::table('migrations')->pluck('batch', 'migration')->toArray();
        } catch (\Throwable $e) {
            $ranMigrations = [];
        }

        $migrationFiles = File::exists(database_path('migrations'))
            ? File::files(database_path('migrations'))
            : [];

        $list = [];
        $total = count($migrationFiles);
        $ranCount = 0;

        foreach ($migrationFiles as $file) {
            $name = $file->getBasename('.php');
            $isRan = isset($ranMigrations[$name]);
            if ($isRan) {
                $ranCount++;
            }

            $list[] = [
                'filename' => $file->getFilename(),
                'name' => $name,
                'ran' => $isRan,
                'batch' => $ranMigrations[$name] ?? null,
            ];
        }

        return [
            'total' => $total,
            'ran' => $ranCount,
            'pending' => $total - $ranCount,
            'items' => $list,
        ];
    }

    private function getTablesData(): array
    {
        try {
            $driver = DB::getDriverName();
            if ($driver === 'mysql') {
                $results = DB::select("
                    SELECT table_name AS name, 
                           table_rows AS rows_count,
                           round(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
                    FROM information_schema.TABLES 
                    WHERE table_schema = DATABASE()
                    ORDER BY table_name ASC
                ");
                return array_map(function ($row) {
                    return [
                        'name' => $row->name,
                        'rows_count' => (int) $row->rows_count,
                        'size_mb' => (float) $row->size_mb,
                    ];
                }, $results);
            } elseif ($driver === 'sqlite') {
                $results = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name ASC");
                return array_map(function ($row) {
                    $cnt = DB::table($row->name)->count();
                    return [
                        'name' => $row->name,
                        'rows_count' => $cnt,
                        'size_mb' => 0,
                    ];
                }, $results);
            }
        } catch (\Throwable $e) {
            return [];
        }

        return [];
    }

    private function getRecentLogs(): string
    {
        $logPath = storage_path('logs/laravel.log');
        if (!File::exists($logPath)) {
            return 'File log belum tersedia.';
        }

        try {
            $lines = file($logPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if (empty($lines)) {
                return 'File log kosong.';
            }

            // Take last 80 lines
            $slice = array_slice($lines, -80);
            return implode("\n", $slice);
        } catch (\Throwable $e) {
            return 'Gagal membaca file log: ' . $e->getMessage();
        }
    }
}
