import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';
import Tabs from '@/Components/UI/Tabs';
import { ConfirmDialog } from '@/Components/UI/ConfirmDialog';
import {
    Database,
    Play,
    RotateCcw,
    Sparkles,
    Trash2,
    Terminal,
    HardDrive,
    FileCode,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Clock,
    Cpu,
    Copy,
    Check,
    RefreshCw,
    Link2,
    Layers,
    Search,
    Server,
    ShieldAlert,
    CheckSquare,
    Loader2,
    X,
    GitBranch,
    GitCommit,
    GitPullRequest,
    ExternalLink,
    FolderGit2,
} from 'lucide-react';

const GitHubIcon = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const THEME_CONFIGS = {
    dark: {
        name: 'Gelap Pekat (Putih Tajam)',
        containerBg: '#090d16',
        headerBg: '#111827',
        border: '#1f2937',
        bodyBg: '#030712',
        textColor: '#ffffff',
        subText: '#cbd5e1',
    },
    matrix: {
        name: 'Matrix Hijau',
        containerBg: '#05130b',
        headerBg: '#0a2215',
        border: '#144328',
        bodyBg: '#020b06',
        textColor: '#22c55e',
        subText: '#86efac',
    },
    light: {
        name: 'Kertas Terang (Hitam Pekat)',
        containerBg: '#ffffff',
        headerBg: '#f1f5f9',
        border: '#cbd5e1',
        bodyBg: '#ffffff',
        textColor: '#0f172a',
        subText: '#475569',
    },
};

export default function DevTool({
    systemInfo = {},
    migrations = { total: 0, ran: 0, pending: 0, items: [] },
    tables = [],
    recentLogs = '',
    gitInfo = {},
}) {
    const [activeTab, setActiveTab] = useState('database');
    const [executing, setExecuting] = useState(false);
    const [currentCommand, setCurrentCommand] = useState(null);
    const [selectedQuickCommand, setSelectedQuickCommand] = useState('migrate:status');

    // Terminal display preferences for crystal clear readability
    const [terminalTheme, setTerminalTheme] = useState('dark'); // 'dark' | 'matrix' | 'light'
    const [terminalFontSize, setTerminalFontSize] = useState(13); // 12 | 13 | 16
    const [terminalWrap, setTerminalWrap] = useState(false);
    const activeTheme = THEME_CONFIGS[terminalTheme] || THEME_CONFIGS.dark;

    // Dynamic data states
    const [migrationsData, setMigrationsData] = useState(migrations);
    const [tablesData, setTablesData] = useState(tables);
    const [gitData, setGitData] = useState(gitInfo);
    const [logsContent, setLogsContent] = useState(recentLogs);
    const [searchMigration, setSearchMigration] = useState('');
    const [searchTable, setSearchTable] = useState('');

    // Terminal console states
    const [consoleOutput, setConsoleOutput] = useState(
        '# Selamat datang di Laravel DevTools Console.\n# Pilih aksi di atas atau jalankan perintah artisan untuk melihat output di sini.'
    );
    const [lastExecution, setLastExecution] = useState(null);
    const [copied, setCopied] = useState(false);

    const [logCopied, setLogCopied] = useState(false);
    const handleCopyLog = () => {
        navigator.clipboard.writeText(logsContent);
        setLogCopied(true);
        setTimeout(() => setLogCopied(false), 2000);
    };

    // Loading & Result Alert Modal States
    const [loadingModal, setLoadingModal] = useState({
        isOpen: false,
        command: '',
        label: '',
    });

    const [resultModal, setResultModal] = useState({
        isOpen: false,
        success: true,
        command: '',
        output: '',
        duration_ms: 0,
        exit_code: 0,
    });

    // Confirm dialog
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmLabel: 'Ya, Jalankan',
        variant: 'danger',
        onConfirm: () => {},
    });

    // Execute artisan command via AJAX
    const runCommand = async (commandKey, customLabel = null) => {
        setExecuting(true);
        setCurrentCommand(commandKey);
        setLoadingModal({
            isOpen: true,
            command: commandKey,
            label: customLabel || `php artisan ${commandKey}`,
        });

        try {
            const res = await axios.post('/admin/devtool/execute', {
                command: commandKey,
            });

            const data = res.data;
            setConsoleOutput(data.output || '(Tidak ada pesan output)');
            setLastExecution({
                command: data.command,
                duration_ms: data.duration_ms,
                exit_code: data.exit_code,
                success: data.success,
                timestamp: new Date().toLocaleTimeString('id-ID'),
            });

            if (data.fresh_migrations) {
                setMigrationsData(data.fresh_migrations);
            }
            if (data.fresh_tables) {
                setTablesData(data.fresh_tables);
            }
            if (data.fresh_git) {
                setGitData(data.fresh_git);
            }

            // Close loading and open result alert modal
            setLoadingModal({ isOpen: false, command: '', label: '' });
            setResultModal({
                isOpen: true,
                success: data.success,
                command: data.command,
                output: data.output || 'Perintah berhasil dieksekusi dengan kode status 0 (sukses).',
                duration_ms: data.duration_ms,
                exit_code: data.exit_code,
            });
        } catch (err) {
            const errData = err.response?.data;
            const errMsg = errData?.output || err.message || 'Gagal menjalankan perintah.';
            setConsoleOutput(errMsg);
            setLastExecution({
                command: 'php artisan ' + commandKey,
                duration_ms: errData?.duration_ms || 0,
                exit_code: 1,
                success: false,
                timestamp: new Date().toLocaleTimeString('id-ID'),
            });

            // Close loading and open error alert modal
            setLoadingModal({ isOpen: false, command: '', label: '' });
            setResultModal({
                isOpen: true,
                success: false,
                command: 'php artisan ' + commandKey,
                output: errMsg,
                duration_ms: errData?.duration_ms || 0,
                exit_code: 1,
            });
        } finally {
            setExecuting(false);
            setCurrentCommand(null);
        }
    };

    // Confirm helper
    const confirmAndRun = (commandKey, title, message, variant = 'danger') => {
        setConfirmDialog({
            isOpen: true,
            title,
            message,
            confirmLabel: 'Ya, Jalankan',
            variant,
            onConfirm: () => {
                setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
                runCommand(commandKey);
            },
        });
    };

    // Refresh logs
    const handleRefreshLogs = async () => {
        try {
            const res = await axios.get('/admin/devtool/refresh-logs');
            if (res.data?.recentLogs) {
                setLogsContent(res.data.recentLogs);
            }
        } catch (e) {
            console.error('Failed to refresh logs', e);
        }
    };

    // Clear logs
    const handleClearLogs = async () => {
        setConfirmDialog({
            isOpen: true,
            title: 'Kosongkan Berkas Log?',
            message: 'Semua catatan log di file storage/logs/laravel.log akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.',
            confirmLabel: 'Kosongkan Log',
            variant: 'danger',
            onConfirm: async () => {
                setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
                try {
                    const res = await axios.post('/admin/devtool/clear-log');
                    setLogsContent(res.data.recentLogs || 'File log kosong.');
                    setConsoleOutput('# Berkas storage/logs/laravel.log telah berhasil dikosongkan.');
                } catch (e) {
                    setConsoleOutput('# Gagal mengosongkan log: ' + (e.message || 'Unknown error'));
                }
            },
        });
    };

    // Copy console output
    const handleCopyOutput = () => {
        navigator.clipboard.writeText(consoleOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Filtered migrations
    const filteredMigrations = migrationsData.items.filter((m) =>
        m.name.toLowerCase().includes(searchMigration.toLowerCase())
    );

    // Filtered tables
    const filteredTables = tablesData.filter((t) =>
        t.name.toLowerCase().includes(searchTable.toLowerCase())
    );

    const tabs = [
        { id: 'database', label: 'Database & Migrasi', icon: Database },
        { id: 'git', label: 'Git & GitHub', icon: GitBranch },
        { id: 'cache', label: 'Cache & Optimasi', icon: Sparkles },
        { id: 'storage', label: 'Storage & Media', icon: HardDrive },
        { id: 'terminal', label: 'Terminal Konsol', icon: Terminal },
        { id: 'logs', label: 'System Logs', icon: FileCode },
        { id: 'specs', label: 'Spesifikasi Server', icon: Server },
    ];

    return (
        <AdminLayout title="Developer Tools & Sistem">
            <PageHeader
                title="Developer Tools & Sistem"
                description="Kelola migrasi database, pembersihan cache, status repositori git, perbaikan symlink, dan diagnostik server."
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={executing}
                            onClick={() => runCommand('git:status', 'Memeriksa status git...')}
                        >
                            <RefreshCw className={`w-3.5 h-3.5 mr-1 text-slate-500 ${executing && currentCommand === 'git:status' ? 'animate-spin' : ''}`} />
                            Status Git
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={executing}
                            onClick={() => runCommand('optimize:clear')}
                        >
                            {executing && currentCommand === 'optimize:clear' ? (
                                <Loader2 className="w-3.5 h-3.5 mr-1 text-amber-500 animate-spin" />
                            ) : (
                                <Trash2 className="w-3.5 h-3.5 mr-1 text-amber-500" />
                            )}
                            Bersihkan Cache
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            disabled={executing}
                            onClick={() => runCommand('migrate')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {executing && currentCommand === 'migrate' ? (
                                <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                            ) : (
                                <Play className="w-3.5 h-3.5 mr-1" />
                            )}
                            Jalankan Migrasi
                        </Button>
                    </div>
                }
            />

            {/* Quick Status Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {/* 1. Migrasi Status */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Status Migrasi
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Database className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">
                            {migrationsData.ran}
                            <span className="text-sm font-normal text-slate-400"> / {migrationsData.total}</span>
                        </span>
                        {migrationsData.pending === 0 ? (
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Up to Date
                            </span>
                        ) : (
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {migrationsData.pending} Tertunda
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                        {migrationsData.pending > 0
                            ? 'Ada migrasi baru yang perlu dijalankan'
                            : 'Seluruh skema tabel database tersinkron'}
                    </p>
                </div>

                {/* 2. Database & Driver */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Database Aktif
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Layers className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-slate-900 truncate">
                            {systemInfo.db_name || 'N/A'}
                        </span>
                        <span className="text-xs uppercase font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {systemInfo.db_connection}
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                        Total {tablesData.length} tabel terdaftar di database
                    </p>
                </div>

                {/* 3. Framework & Environment */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Framework & PHP
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Cpu className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900">
                            Laravel {systemInfo.laravel_version}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                            (PHP {systemInfo.php_version?.split('-')[0]})
                        </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                        <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                            systemInfo.app_env === 'production'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                            {systemInfo.app_env}
                        </span>
                        {systemInfo.app_debug && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                Debug ON
                            </span>
                        )}
                    </div>
                </div>

                {/* 4. Storage Link Status */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Tautan Storage
                        </span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            systemInfo.storage_linked ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                            <Link2 className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {systemInfo.storage_linked ? (
                            <span className="text-base font-bold text-emerald-600 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Terhubung
                            </span>
                        ) : (
                            <span className="text-base font-bold text-red-600 flex items-center gap-1.5">
                                <XCircle className="w-4 h-4" /> Belum Dibuat
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                        {systemInfo.storage_linked
                            ? 'public/storage siap melayani berkas'
                            : 'Jalankan storage:link agar foto aktif'}
                    </p>
                </div>

                {/* 5. Repositori GitHub Status */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Repositori GitHub
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                            <GitHubIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <a
                            href={gitData?.github_url || 'https://github.com/Agusggwp/CMS-sd'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 transition-colors flex items-center gap-1 group"
                            title="Buka Repositori di GitHub"
                        >
                            <span className="truncate">{gitData?.repo_name || 'Agusggwp/CMS-sd'}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                        </a>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                            <GitBranch className="w-3 h-3 text-slate-500" />
                            {gitData?.branch || 'main'}
                        </span>
                        {gitData?.is_clean ? (
                            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Bersih
                            </span>
                        ) : (
                            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {(gitData?.modified_count || 0) + (gitData?.untracked_count || 0)} Berubah
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400 truncate font-mono">
                        Commit #{gitData?.commit_hash || 'HEAD'}
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

            {/* TAB 1: DATABASE & MIGRATIONS */}
            {activeTab === 'database' && (
                <div className="space-y-6">
                    {/* Action Toolbar Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-blue-600" />
                                    Operasi Database & Migrasi
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Kelola eksekusi berkas migrasi database secara aman dari panel antarmuka admin.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() => runCommand('migrate:status')}
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${executing && currentCommand === 'migrate:status' ? 'animate-spin' : ''}`} />
                                    Cek Status
                                </Button>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() => runCommand('migrate')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Play className={`w-3.5 h-3.5 mr-1.5 ${executing && currentCommand === 'migrate' ? 'animate-spin' : ''}`} />
                                    Jalankan Migrasi (migrate)
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() =>
                                        confirmAndRun(
                                            'migrate:rollback',
                                            'Konfirmasi Rollback Migrasi',
                                            'Peringatan: Perintah ini akan membatalkan (rollback) 1 batch migrasi terakhir. Beberapa tabel atau kolom mungkin akan terhapus. Lanjutkan?',
                                            'danger'
                                        )
                                    }
                                >
                                    <RotateCcw className={`w-3.5 h-3.5 mr-1.5 ${executing && currentCommand === 'migrate:rollback' ? 'animate-spin' : ''}`} />
                                    Rollback Step 1
                                </Button>

                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() =>
                                        confirmAndRun(
                                            'db:seed',
                                            'Jalankan Database Seeder?',
                                            'Akan menjalankan seeder database utama (DatabaseSeeder). Data default akan dibuat jika belum ada.',
                                            'primary'
                                        )
                                    }
                                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                    <CheckSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                                    Seed Database
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Migrations List (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        Daftar Berkas Migrasi ({migrationsData.items.length})
                                    </h4>
                                    <p className="text-xs text-slate-400">
                                        Lokasi: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">database/migrations/</code>
                                    </p>
                                </div>
                                <div className="relative w-48 sm:w-56">
                                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Cari migrasi..."
                                        value={searchMigration}
                                        onChange={(e) => setSearchMigration(e.target.value)}
                                        style={{ paddingLeft: '34px' }}
                                        className="w-full pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto max-h-[460px] overflow-y-auto rounded-xl border border-slate-100">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px] sticky top-0">
                                        <tr>
                                            <th className="py-2.5 px-3">Nama Berkas Migrasi</th>
                                            <th className="py-2.5 px-3 text-center">Batch</th>
                                            <th className="py-2.5 px-3 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredMigrations.length > 0 ? (
                                            filteredMigrations.map((m, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                                    <td className="py-2.5 px-3">
                                                        <div className="font-mono text-slate-800 text-[11px] truncate max-w-xs sm:max-w-md">
                                                            {m.filename}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 px-3 text-center font-mono text-slate-500">
                                                        {m.batch ? `[${m.batch}]` : '-'}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-right">
                                                        {m.ran ? (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                                <CheckCircle2 className="w-3 h-3" /> Ran
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                                                <Clock className="w-3 h-3" /> Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-slate-400">
                                                    Tidak ada migrasi yang sesuai pencarian.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Database Tables Overview (5 cols) */}
                        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        Tabel Database ({tablesData.length})
                                    </h4>
                                    <p className="text-xs text-slate-400">
                                        Skema database aktif: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">{systemInfo.db_name}</code>
                                    </p>
                                </div>
                                <div className="relative w-44 sm:w-52">
                                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Cari tabel..."
                                        value={searchTable}
                                        onChange={(e) => setSearchTable(e.target.value)}
                                        style={{ paddingLeft: '34px' }}
                                        className="w-full pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto max-h-[460px] overflow-y-auto rounded-xl border border-slate-100">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px] sticky top-0">
                                        <tr>
                                            <th className="py-2.5 px-3">Nama Tabel</th>
                                            <th className="py-2.5 px-3 text-right">Perkiraan Baris</th>
                                            <th className="py-2.5 px-3 text-right">Ukuran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredTables.length > 0 ? (
                                            filteredTables.map((t, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                                    <td className="py-2 px-3 font-mono font-medium text-slate-800 text-[11px]">
                                                        {t.name}
                                                    </td>
                                                    <td className="py-2 px-3 text-right font-mono text-slate-600">
                                                        {t.rows_count.toLocaleString()}
                                                    </td>
                                                    <td className="py-2 px-3 text-right font-mono text-slate-400 text-[11px]">
                                                        {t.size_mb > 0 ? `${t.size_mb} MB` : '< 0.1 MB'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-slate-400">
                                                    Tidak ada tabel ditemukan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: GIT & GITHUB REPOSITORY */}
            {activeTab === 'git' && (
                <div className="space-y-6">
                    {/* GitHub Hero Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 shadow-md border border-slate-700/60">
                        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                            <GitHubIcon className="w-56 h-56 text-white" />
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="space-y-3 max-w-2xl">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-inner">
                                        <GitHubIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-xl font-bold text-white tracking-tight">
                                                {gitData?.repo_name || 'Agusggwp/CMS-sd'}
                                            </h3>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                <GitBranch className="w-3 h-3" />
                                                {gitData?.branch || 'main'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-300 font-mono mt-0.5 flex items-center gap-1.5">
                                            <span className="text-slate-400">Remote:</span>
                                            <span className="truncate">{gitData?.remote_url || 'https://github.com/Agusggwp/CMS-sd.git'}</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Pantau commit terbaru, status perubahan berkas lokal, cabang aktif, dan lakukan pembaruan langsung dari repositori GitHub resmi sistem.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() => runCommand('git:status', 'Memeriksa status repositori git...')}
                                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${executing && currentCommand === 'git:status' ? 'animate-spin' : ''}`} />
                                    Cek Status
                                </Button>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    disabled={executing}
                                    onClick={() =>
                                        confirmAndRun(
                                            'git:pull',
                                            'Tarik Pembaruan Repositori (git pull)',
                                            'Perintah ini akan menarik commit dan file terbaru dari cabang remote GitHub ke server lokal. Pastikan tidak ada konflik file lokal yang sedang diedit. Lanjutkan?',
                                            'primary'
                                        )
                                    }
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 text-xs shadow-sm"
                                >
                                    <GitPullRequest className={`w-3.5 h-3.5 mr-1.5 ${executing && currentCommand === 'git:pull' ? 'animate-spin' : ''}`} />
                                    Tarik Pembaruan (git pull)
                                </Button>

                                {gitData?.github_url && (
                                    <a
                                        href={gitData.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 shadow-sm transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Buka di GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Commit & Working Tree Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 1. Branch & Remote */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Cabang & Remote
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <GitBranch className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-900 font-mono">
                                    {gitData?.branch || 'main'}
                                </span>
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                    origin/{gitData?.branch || 'main'}
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-slate-500 space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Repositori:</span>
                                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">{gitData?.repo_name || 'Agusggwp/CMS-sd'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Tipe Akses:</span>
                                    <span className="text-slate-700">HTTPS Origin</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Status Working Tree */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Status Working Tree
                                </span>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    gitData?.is_clean ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {gitData?.is_clean ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {gitData?.is_clean ? (
                                    <span className="text-lg font-bold text-emerald-600 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4" /> Bersih (Clean)
                                    </span>
                                ) : (
                                    <span className="text-lg font-bold text-amber-600 flex items-center gap-1.5">
                                        {(gitData?.modified_count || 0) + (gitData?.untracked_count || 0)} Berkas Berubah
                                    </span>
                                )}
                            </div>
                            <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
                                <span><strong className="text-slate-700 font-bold">{gitData?.modified_count || 0}</strong> dimodifikasi</span>
                                <span>•</span>
                                <span><strong className="text-slate-700 font-bold">{gitData?.untracked_count || 0}</strong> belum terlacak</span>
                            </div>
                        </div>

                        {/* 3. Commit Head Terbaru */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Commit Terakhir (HEAD)
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <GitCommit className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                    #{gitData?.commit_hash || 'HEAD'}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {gitData?.commit_date || 'Baru saja'}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-slate-600 line-clamp-2 italic" title={gitData?.commit_message}>
                                "{gitData?.commit_message || 'Tidak ada pesan commit'}"
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400 font-medium">
                                Oleh: <span className="text-slate-700 font-semibold">{gitData?.commit_author || 'Agusggwp'}</span>
                            </p>
                        </div>
                    </div>

                    {/* Working Tree Changes List & Recent Commits */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Perubahan Berkas Lokal */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                        <FolderGit2 className="w-4 h-4 text-amber-500" />
                                        Perubahan Berkas Lokal (Working Tree)
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Berkas yang sedang aktif diedit atau ditambahkan di direktori lokal.
                                    </p>
                                </div>
                                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                    {gitData?.changes?.length || 0} Berkas
                                </span>
                            </div>

                            {gitData?.changes && gitData.changes.length > 0 ? (
                                <div className="space-y-1.5 overflow-y-auto max-h-80 pr-1 text-xs font-mono">
                                    {gitData.changes.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors"
                                        >
                                            <span className="truncate text-slate-800 pr-2" title={item.file}>
                                                {item.file}
                                            </span>
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 uppercase tracking-wide ${
                                                    item.type === 'untracked'
                                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                                                }`}
                                            >
                                                {item.type === 'untracked' ? 'Untracked' : 'Modified'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center flex flex-col items-center justify-center text-slate-400">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2 stroke-1" />
                                    <p className="text-xs font-semibold text-slate-700">Working Tree Bersih!</p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Seluruh berkas lokal telah tersinkron dan di-commit.
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs text-slate-400">
                                    Jalankan <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">git status</code> untuk rincian lengkap.
                                </span>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => runCommand('git:status')}
                                    disabled={executing}
                                    className="text-xs"
                                >
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    Cek Sekarang
                                </Button>
                            </div>
                        </div>

                        {/* Riwayat 5 Commit Terakhir */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                        <GitCommit className="w-4 h-4 text-purple-600" />
                                        Riwayat Commit Terakhir
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Catatan riwayat pembaruan kode yang tersimpan pada repositori.
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => runCommand('git:log')}
                                    disabled={executing}
                                    className="text-xs"
                                >
                                    Log Lengkap
                                </Button>
                            </div>

                            {gitData?.recent_commits && gitData.recent_commits.length > 0 ? (
                                <div className="space-y-3 overflow-y-auto max-h-80 pr-1 text-xs">
                                    {gitData.recent_commits.map((commit, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 transition-all flex flex-col gap-1.5"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-mono font-bold text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                                                        #{commit.hash}
                                                    </span>
                                                    <span className="font-semibold text-slate-800 text-xs">
                                                        {commit.author}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-400">
                                                    {commit.date}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 text-xs font-medium leading-relaxed">
                                                {commit.message}
                                            </p>
                                            {gitData?.github_url && (
                                                <div className="pt-1 flex justify-end">
                                                    <a
                                                        href={`${gitData.github_url}/commit/${commit.hash}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                                                    >
                                                        Lihat di GitHub
                                                        <ExternalLink className="w-2.5 h-2.5" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center text-slate-400 text-xs">
                                    Tidak ada data commit terbaru.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Git Commands Action Bar */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-blue-600" />
                            Aksi Cepat Git (Git Commands)
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                            Eksekusi perintah git yang sering digunakan dengan visual feedback terminal otomatis.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <button
                                type="button"
                                disabled={executing}
                                onClick={() => runCommand('git:status', 'Memeriksa status repositori git...')}
                                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 text-left transition-all group disabled:opacity-50"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                                        git status
                                    </span>
                                    <RefreshCw className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-all" />
                                </div>
                                <div className="text-xs font-bold text-slate-800">Cek Status Berkas</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Lihat file staging dan file yang berubah</div>
                            </button>

                            <button
                                type="button"
                                disabled={executing}
                                onClick={() =>
                                    confirmAndRun(
                                        'git:pull',
                                        'Tarik Pembaruan (git pull)',
                                        'Menjalankan "git pull" untuk menarik commit dan file terbaru dari cabang remote origin. Lanjutkan?',
                                        'primary'
                                    )
                                }
                                className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/30 text-left transition-all group disabled:opacity-50"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                        git pull
                                    </span>
                                    <GitPullRequest className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                </div>
                                <div className="text-xs font-bold text-slate-800">Tarik Pembaruan</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Tarik & gabungkan kode terbaru dari GitHub</div>
                            </button>

                            <button
                                type="button"
                                disabled={executing}
                                onClick={() => runCommand('git:fetch', 'Mengambil referensi dari remote origin...')}
                                className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50/50 hover:bg-purple-50/30 text-left transition-all group disabled:opacity-50"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                                        git fetch
                                    </span>
                                    <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                </div>
                                <div className="text-xs font-bold text-slate-800">Fetch Referensi</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Periksa perubahan remote tanpa merge</div>
                            </button>

                            <button
                                type="button"
                                disabled={executing}
                                onClick={() => runCommand('git:log', 'Membaca riwayat 10 commit terakhir...')}
                                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 text-left transition-all group disabled:opacity-50"
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                                        git log
                                    </span>
                                    <GitCommit className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                </div>
                                <div className="text-xs font-bold text-slate-800">Riwayat Commit</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Tampilkan 10 commit terakhir di konsol</div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: CACHE & OPTIMIZATION */}
            {activeTab === 'cache' && (
                <div className="space-y-6">
                    <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-600">
                            <strong className="text-slate-900 block font-semibold mb-0.5">
                                Tentang Cache & Optimasi Laravel
                            </strong>
                            Gunakan tombol pembersihan cache jika Anda baru saja mengubah pengaturan di berkas <code className="bg-blue-100 px-1 py-0.5 rounded text-[11px]">.env</code>, memperbarui rute baru, atau tampilan halaman website tidak segera diperbarui.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 1. Optimize Clear */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Bersihkan Semua Cache (All-in-One)
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan optimize:clear
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Menghapus seluruh cache konfigurasi, rute, template Blade, dan cache aplikasi sekaligus dalam satu langkah.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-4 w-full justify-center bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                                disabled={executing}
                                onClick={() => runCommand('optimize:clear')}
                            >
                                {executing && currentCommand === 'optimize:clear' ? (
                                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                ) : (
                                    <Play className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                Bersihkan Semua Cache
                            </Button>
                        </div>

                        {/* 2. Config Cache */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Cache Konfigurasi (Production)
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan config:cache
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Menggabungkan semua berkas config ke dalam satu file tunggal untuk mempercepat loading halaman di server produksi.
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full justify-center text-xs"
                                    disabled={executing}
                                    onClick={() => runCommand('config:cache')}
                                >
                                    {executing && currentCommand === 'config:cache' ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : null}
                                    Cache
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full justify-center text-xs"
                                    disabled={executing}
                                    onClick={() => runCommand('config:clear')}
                                >
                                    {executing && currentCommand === 'config:clear' ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : null}
                                    Clear
                                </Button>
                            </div>
                        </div>

                        {/* 3. Route Cache */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Cache Rute URL
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan route:cache
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Kompilasi daftar rute Laravel untuk respon URL yang lebih instan, atau hapus cache saat menambahkan halaman baru.
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full justify-center text-xs bg-purple-600 hover:bg-purple-700 text-white"
                                    disabled={executing}
                                    onClick={() => runCommand('route:cache')}
                                >
                                    {executing && currentCommand === 'route:cache' ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : null}
                                    Cache
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full justify-center text-xs"
                                    disabled={executing}
                                    onClick={() => runCommand('route:clear')}
                                >
                                    {executing && currentCommand === 'route:clear' ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : null}
                                    Clear
                                </Button>
                            </div>
                        </div>

                        {/* 4. View Cache */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                                    <FileCode className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Cache Tampilan (Blade View)
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan view:clear
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Membersihkan berkas kompilasi Blade view yang tersimpan di direktori storage/framework/views.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-4 w-full justify-center"
                                disabled={executing}
                                onClick={() => runCommand('view:clear')}
                            >
                                {executing && currentCommand === 'view:clear' ? (
                                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-slate-500" />
                                ) : (
                                    <Trash2 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                                )}
                                Bersihkan View Cache
                            </Button>
                        </div>

                        {/* 5. Application Cache */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                                    <RefreshCw className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Application Data Cache
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan cache:clear
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Menghapus data sementara yang dicache oleh aplikasi, seperti pengaturan identitas sekolah dan statistik.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-4 w-full justify-center"
                                disabled={executing}
                                onClick={() => runCommand('cache:clear')}
                            >
                                {executing && currentCommand === 'cache:clear' ? (
                                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-slate-500" />
                                ) : (
                                    <Trash2 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                                )}
                                Clear App Cache
                            </Button>
                        </div>

                        {/* 6. Laravel About Info */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                                    <Server className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">
                                    Diagnostik Sistem Lengkap
                                </h4>
                                <code className="text-[11px] font-mono text-slate-400 block my-1">
                                    php artisan about
                                </code>
                                <p className="text-xs text-slate-500 mt-2">
                                    Menjalankan ringkasan menyeluruh status aplikasi, driver cache, session, database, dan lingkungan hosting.
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-4 w-full justify-center"
                                disabled={executing}
                                onClick={() => runCommand('about')}
                            >
                                {executing && currentCommand === 'about' ? (
                                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                ) : (
                                    <Play className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                Jalankan Diagnostik
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: STORAGE & MEDIA */}
            {activeTab === 'storage' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <HardDrive className="w-5 h-5 text-blue-600" />
                                    <h3 className="text-base font-bold text-slate-900">
                                        Tautan Simbolis Berkas Publik (Storage Symlink)
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                                    Di Laravel, berkas yang diunggah (logo sekolah, foto kepala sekolah, galeri, foto guru, berkas PPDB) disimpan di direktori privat <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">storage/app/public</code>. Agar berkas tersebut dapat diakses oleh browser publik, folder tersebut harus ditautkan ke <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">public/storage</code>.
                                </p>

                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="font-semibold text-slate-700">Status Saat Ini:</span>
                                        {systemInfo.storage_linked ? (
                                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Tautan Aktif & Terhubung
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                                                <XCircle className="w-3.5 h-3.5" /> Tautan Belum Terpasang
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="md"
                                disabled={executing}
                                onClick={() => runCommand('storage:link')}
                                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {executing && currentCommand === 'storage:link' ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Link2 className="w-4 h-4 mr-2" />
                                )}
                                Hubungkan Storage (storage:link)
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-emerald-600" /> Kapan perlu dijalankan?
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
                                <li>Saat pertama kali deploy website ke hosting atau VPS baru.</li>
                                <li>Jika gambar guru, galeri, atau logo sekolah menampilkan icon broken image (gambar rusak).</li>
                                <li>Setelah menjalankan clone repository baru di komputer lokal.</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                <HardDrive className="w-4 h-4 text-blue-600" /> Informasi Kapasitas Penyimpanan
                            </span>
                            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                                <div>Ruang Bebas: <strong className="text-slate-800">{systemInfo.disk_free}</strong></div>
                                <div>Total Kapasitas: <strong className="text-slate-800">{systemInfo.disk_total}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: TERMINAL CONSOLE */}
            {activeTab === 'terminal' && (
                <div className="space-y-4">
                    {/* Command bar */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-xs font-bold text-slate-700 shrink-0">
                                Pilih Perintah:
                            </span>
                            <select
                                value={selectedQuickCommand}
                                onChange={(e) => setSelectedQuickCommand(e.target.value)}
                                className="text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 flex-1 sm:w-64"
                            >
                                <option value="migrate:status">php artisan migrate:status</option>
                                <option value="migrate">php artisan migrate --force</option>
                                <option value="git:status">git status</option>
                                <option value="git:pull">git pull</option>
                                <option value="git:fetch">git fetch</option>
                                <option value="git:log">git log -n 10 --oneline</option>
                                <option value="optimize:clear">php artisan optimize:clear</option>
                                <option value="config:cache">php artisan config:cache</option>
                                <option value="config:clear">php artisan config:clear</option>
                                <option value="route:cache">php artisan route:cache</option>
                                <option value="route:clear">php artisan route:clear</option>
                                <option value="view:clear">php artisan view:clear</option>
                                <option value="cache:clear">php artisan cache:clear</option>
                                <option value="storage:link">php artisan storage:link</option>
                                <option value="about">php artisan about</option>
                            </select>
                            <Button
                                variant="primary"
                                size="sm"
                                disabled={executing}
                                onClick={() => runCommand(selectedQuickCommand)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Play className="w-3.5 h-3.5 mr-1" />
                                Jalankan
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCopyOutput}
                                className="text-xs"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                        Tersalin!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5 mr-1" />
                                        Salin Output
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setConsoleOutput('# Konsol dibersihkan.')}
                                className="text-xs text-slate-500 hover:text-slate-800"
                            >
                                Bersihkan
                            </Button>
                        </div>
                    </div>

                    {/* Ultra High-Contrast Terminal Window */}
                    <div
                        className="rounded-2xl border shadow-xl overflow-hidden font-mono"
                        style={{
                            backgroundColor: activeTheme.containerBg,
                            borderColor: activeTheme.border,
                        }}
                    >
                        {/* Terminal Header Bar */}
                        <div
                            className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs"
                            style={{
                                backgroundColor: activeTheme.headerBg,
                                borderColor: activeTheme.border,
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#ef4444' }} />
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#f59e0b' }} />
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#10b981' }} />
                                <span
                                    className="ml-2 font-bold text-sm tracking-wide"
                                    style={{ color: activeTheme.headerBg === '#f1f5f9' ? '#0f172a' : '#f8fafc' }}
                                >
                                    Laravel Artisan Console
                                </span>
                            </div>

                            {/* Display Controls (Theme, Size, Wrap) */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Theme Selector */}
                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[11px]">
                                    <span className="text-slate-400 font-sans mr-0.5">Tema:</span>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('dark')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'dark'
                                                ? 'bg-blue-600 text-white shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Gelap
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('matrix')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'matrix'
                                                ? 'bg-emerald-600 text-white shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Matrix
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('light')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'light'
                                                ? 'bg-white text-slate-900 shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Terang
                                    </button>
                                </div>

                                {/* Font Size */}
                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[11px]">
                                    <span className="text-slate-400 font-sans mr-0.5">Ukuran:</span>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalFontSize(12)}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold ${
                                            terminalFontSize === 12
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        12px
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalFontSize(13)}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold ${
                                            terminalFontSize === 13
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        14px
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalFontSize(16)}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold ${
                                            terminalFontSize === 16
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        16px
                                    </button>
                                </div>

                                {/* Wrap Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setTerminalWrap(!terminalWrap)}
                                    className={`px-2 py-1 rounded-lg text-[11px] font-sans font-bold border transition-colors ${
                                        terminalWrap
                                            ? 'bg-purple-600 text-white border-purple-500'
                                            : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
                                    }`}
                                >
                                    {terminalWrap ? 'Bungkus Baris' : 'Kolom Rapi'}
                                </button>
                            </div>

                            {lastExecution && (
                                <div className="flex items-center gap-2.5 text-xs font-sans">
                                    <span style={{ color: activeTheme.subText }}>
                                        Waktu: <strong className="text-slate-100">{lastExecution.timestamp}</strong>
                                    </span>
                                    <span style={{ color: activeTheme.subText }}>
                                        Durasi: <strong className="text-sky-300">{lastExecution.duration_ms} ms</strong>
                                    </span>
                                    <span
                                        className="px-2 py-0.5 rounded text-[11px] font-bold border"
                                        style={
                                            lastExecution.exit_code === 0
                                                ? { backgroundColor: '#064e3b', color: '#6ee7b7', borderColor: '#059669' }
                                                : { backgroundColor: '#7f1d1d', color: '#fca5a5', borderColor: '#b91c1c' }
                                        }
                                    >
                                        Exit: {lastExecution.exit_code} ({lastExecution.exit_code === 0 ? 'SUCCESS' : 'FAILED'})
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Terminal Body */}
                        <div
                            className="p-5 overflow-x-auto max-h-[520px] overflow-y-auto select-text"
                            style={{
                                backgroundColor: activeTheme.bodyBg,
                            }}
                        >
                            {executing ? (
                                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Menjalankan php artisan {currentCommand}... Mohon tunggu sebentar.</span>
                                </div>
                            ) : (
                                <pre
                                    className={`font-mono leading-relaxed font-semibold ${
                                        terminalWrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
                                    }`}
                                    style={{
                                        color: activeTheme.textColor,
                                        fontSize: `${terminalFontSize}px`,
                                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                        lineHeight: '1.65',
                                        letterSpacing: '0.01em',
                                    }}
                                >
                                    {consoleOutput}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: SYSTEM LOGS */}
            {activeTab === 'logs' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-purple-600" />
                                Berkas Log Aplikasi (storage/logs/laravel.log)
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Menampilkan 80 baris log terakhir yang direkam oleh sistem Laravel.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleRefreshLogs}
                            >
                                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                                Segarkan Log
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleClearLogs}
                            >
                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                Kosongkan Berkas Log
                            </Button>
                        </div>
                    </div>

                    <div
                        className="rounded-2xl border shadow-xl overflow-hidden font-mono"
                        style={{
                            backgroundColor: activeTheme.containerBg,
                            borderColor: activeTheme.border,
                        }}
                    >
                        {/* Log Viewer Header Bar */}
                        <div
                            className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs"
                            style={{
                                backgroundColor: activeTheme.headerBg,
                                borderColor: activeTheme.border,
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#ef4444' }} />
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#f59e0b' }} />
                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#10b981' }} />
                                <span
                                    className="ml-2 font-bold text-sm tracking-wide"
                                    style={{ color: activeTheme.headerBg === '#f1f5f9' ? '#0f172a' : '#ffffff' }}
                                >
                                    storage/logs/laravel.log
                                </span>
                            </div>

                            {/* Display Controls (Theme, Size, Wrap, Copy) */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Theme Selector */}
                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[11px]">
                                    <span className="text-slate-300 font-sans mr-0.5">Tema:</span>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('dark')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'dark'
                                                ? 'bg-blue-600 text-white shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Gelap (Putih)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('matrix')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'matrix'
                                                ? 'bg-emerald-600 text-white shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Matrix
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalTheme('light')}
                                        className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                            terminalTheme === 'light'
                                                ? 'bg-white text-slate-900 shadow-xs'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        Terang (Hitam)
                                    </button>
                                </div>

                                {/* Font Size Selector */}
                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[11px]">
                                    <span className="text-slate-300 font-sans mr-0.5">Font:</span>
                                    {[12, 14, 16].map((sz) => (
                                        <button
                                            key={sz}
                                            type="button"
                                            onClick={() => setTerminalFontSize(sz)}
                                            className={`px-1.5 py-0.5 rounded font-sans font-bold transition-all ${
                                                terminalFontSize === sz
                                                    ? 'bg-purple-600 text-white shadow-xs'
                                                    : 'text-slate-300 hover:text-white'
                                            }`}
                                        >
                                            {sz}px
                                        </button>
                                    ))}
                                </div>

                                {/* Line Wrap Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setTerminalWrap(!terminalWrap)}
                                    className={`px-2 py-1 rounded-lg font-sans text-[11px] font-bold border transition-all ${
                                        terminalWrap
                                            ? 'bg-blue-600 text-white border-blue-500'
                                            : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
                                    }`}
                                >
                                    {terminalWrap ? 'Wrap Aktif' : 'No-Wrap'}
                                </button>

                                {/* Salin Log */}
                                <button
                                    type="button"
                                    onClick={handleCopyLog}
                                    className="px-2.5 py-1 rounded-lg font-sans text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center gap-1"
                                >
                                    {logCopied ? (
                                        <>
                                            <Check className="w-3 h-3 text-emerald-400" />
                                            Tersalin!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Salin Log
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Log Output Body */}
                        <div
                            className="p-5 overflow-x-auto max-h-[600px] overflow-y-auto select-text font-mono transition-colors"
                            style={{
                                backgroundColor: activeTheme.bodyBg,
                            }}
                        >
                            <pre
                                className="font-mono font-medium leading-relaxed select-text"
                                style={{
                                    color: activeTheme.textColor,
                                    backgroundColor: activeTheme.bodyBg,
                                    fontSize: `${terminalFontSize}px`,
                                    whiteSpace: terminalWrap ? 'pre-wrap' : 'pre',
                                    fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace',
                                    lineHeight: '1.75',
                                }}
                            >
                                {logsContent}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 6: SERVER SPECS */}
            {activeTab === 'specs' && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-600" />
                            Detail Lingkungan & Server Hosting
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Informasi konfigurasi PHP, Laravel, dan sistem operasi yang sedang berjalan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-100 overflow-hidden text-xs">
                            <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 border-b border-slate-100">
                                Konfigurasi Aplikasi & Framework
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Versi Laravel</span>
                                    <span className="font-mono font-bold text-slate-800">{systemInfo.laravel_version}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Versi PHP</span>
                                    <span className="font-mono font-bold text-slate-800">{systemInfo.php_version}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">App Environment</span>
                                    <span className="font-mono font-bold uppercase text-slate-800">{systemInfo.app_env}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Debug Mode</span>
                                    <span className={`font-mono font-bold ${systemInfo.app_debug ? 'text-amber-600' : 'text-slate-800'}`}>
                                        {systemInfo.app_debug ? 'TRUE (Aktif)' : 'FALSE (Nonaktif)'}
                                    </span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">URL Aplikasi</span>
                                    <span className="font-mono text-slate-800 truncate max-w-xs">{systemInfo.app_url}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Timezone</span>
                                    <span className="font-mono text-slate-800">{systemInfo.timezone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 overflow-hidden text-xs">
                            <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 border-b border-slate-100">
                                Lingkungan Server & Database
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Sistem Operasi (OS)</span>
                                    <span className="font-mono text-slate-800">{systemInfo.server_os}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Web Server Software</span>
                                    <span className="font-mono text-slate-800 truncate max-w-xs">{systemInfo.server_software}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Database Driver</span>
                                    <span className="font-mono uppercase font-bold text-slate-800">{systemInfo.db_connection}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Nama Database</span>
                                    <span className="font-mono font-bold text-slate-800">{systemInfo.db_name}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Memory Limit</span>
                                    <span className="font-mono text-slate-800">{systemInfo.memory_limit}</span>
                                </div>
                                <div className="px-4 py-2.5 flex justify-between">
                                    <span className="text-slate-500">Max Execution Time</span>
                                    <span className="font-mono text-slate-800">{systemInfo.max_execution_time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmLabel={confirmDialog.confirmLabel}
                variant={confirmDialog.variant}
            />

            {/* 1. INTERACTIVE LOADING MODAL */}
            {loadingModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="min-h-screen px-4 text-center flex items-center justify-center">
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity" />

                        {/* Modal Box */}
                        <div className="relative bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl max-w-md w-full z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                                <Loader2 className="w-8 h-8 animate-spin" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900">
                                Sedang Memproses Perintah...
                            </h3>

                            <div className="my-3 px-3 py-2 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400 font-bold border border-slate-800 break-all">
                                $ php artisan {loadingModal.command}
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed">
                                Mohon tunggu sebentar, server sedang memproses perintah sistem dan memperbarui database/cache.
                            </p>

                            <div className="mt-5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. RESULT ALERT MODAL (ALERT HASIL EKSEKUSI) */}
            {resultModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="min-h-screen px-4 text-center flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
                            onClick={() => setResultModal((prev) => ({ ...prev, isOpen: false }))}
                        />

                        {/* Modal Box */}
                        <div className="relative bg-white rounded-3xl p-6 sm:p-7 text-left shadow-2xl max-w-xl w-full z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                            resultModal.success
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-rose-100 text-rose-600'
                                        }`}
                                    >
                                        {resultModal.success ? (
                                            <CheckCircle2 className="w-7 h-7" />
                                        ) : (
                                            <AlertTriangle className="w-7 h-7" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900">
                                            {resultModal.success ? 'Eksekusi Berhasil!' : 'Eksekusi Gagal / Terjadi Kendala'}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                                    resultModal.success
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}
                                            >
                                                Status: {resultModal.success ? 'SUCCESS (0)' : `ERROR (${resultModal.exit_code})`}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                Durasi: <strong className="text-slate-700">{resultModal.duration_ms} ms</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setResultModal((prev) => ({ ...prev, isOpen: false }))}
                                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Command details */}
                            <div className="mt-4">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    Perintah yang Dijalankan:
                                </div>
                                <div className="px-3.5 py-2.5 bg-slate-900 rounded-xl font-mono text-xs text-white border border-slate-800 flex items-center justify-between">
                                    <span className="text-emerald-400 font-bold">{resultModal.command}</span>
                                    <span className="text-[10px] text-slate-400">
                                        {new Date().toLocaleTimeString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            {/* Output preview */}
                            <div className="mt-3.5">
                                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                                    <span>Output Hasil Sistem:</span>
                                    <span className="text-[10px] text-slate-400 font-normal">
                                        Format Konsol Asli
                                    </span>
                                </div>
                                <div
                                    className="rounded-xl border p-4 max-h-64 overflow-auto text-xs font-mono font-semibold"
                                    style={{
                                        backgroundColor: '#030712',
                                        color: resultModal.success ? '#4ade80' : '#f87171',
                                        borderColor: '#1f2937',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    <pre className="whitespace-pre font-mono">
                                        {resultModal.output}
                                    </pre>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResultModal((prev) => ({ ...prev, isOpen: false }));
                                        setActiveTab('terminal');
                                    }}
                                    className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline gap-1.5"
                                >
                                    <Terminal className="w-4 h-4" />
                                    Buka di Tab Terminal Konsol
                                </button>

                                <Button
                                    variant={resultModal.success ? 'primary' : 'secondary'}
                                    size="md"
                                    onClick={() => setResultModal((prev) => ({ ...prev, isOpen: false }))}
                                    className={resultModal.success ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
                                >
                                    Tutup Hasil
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
