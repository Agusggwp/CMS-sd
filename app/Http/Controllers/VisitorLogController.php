<?php

namespace App\Http\Controllers;

use App\Models\SchoolSetting;
use App\Models\VisitorLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VisitorLogController extends Controller
{
    /**
     * Handle incoming visitor location log and send to Discord Webhook.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'accuracy' => 'nullable|numeric',
            'status' => 'required|string|max:50',
            'page_url' => 'nullable|string|max:1000',
            'page_title' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'region' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
        ]);

        $ip = $request->ip() ?: $request->header('X-Forwarded-For') ?: 'Unknown';
        $userAgent = $request->userAgent() ?: 'Unknown';

        // Parse User Agent info
        $deviceInfo = $this->parseUserAgent($userAgent);

        // Save to database
        $log = VisitorLog::create([
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'device' => $deviceInfo['device'],
            'browser' => $deviceInfo['browser'],
            'os' => $deviceInfo['os'],
            'page_url' => $validated['page_url'] ?? $request->header('Referer') ?? '/',
            'page_title' => $validated['page_title'] ?? 'SDN 4 Sebatu',
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'accuracy' => $validated['accuracy'] ?? null,
            'status' => $validated['status'],
            'city' => $validated['city'] ?? null,
            'region' => $validated['region'] ?? null,
            'country' => $validated['country'] ?? null,
            'discord_notified' => false,
        ]);

        // Send to Discord Webhook
        $discordSent = $this->sendToDiscord($log);

        if ($discordSent) {
            $log->update(['discord_notified' => true]);
        }

        return response()->json([
            'success' => true,
            'log_id' => $log->id,
            'discord_notified' => $discordSent,
        ]);
    }

    /**
     * Send Rich Embed notification to Discord Webhook.
     */
    protected function sendToDiscord(VisitorLog $log): bool
    {
        $webhookUrl = config('services.discord.webhook_url') 
            ?: env('DISCORD_WEBHOOK_URL') 
            ?: SchoolSetting::get('discord_webhook_url');

        if (empty($webhookUrl)) {
            Log::info('Discord Webhook URL not configured. Visitor logged to DB: #' . $log->id);
            return false;
        }

        try {
            $statusEmoji = match ($log->status) {
                'granted' => '🟢 Lokasi Terdeteksi (Granted)',
                'denied' => '🔴 Akses Lokasi Ditolak (Denied)',
                'unavailable' => '🟡 Lokasi Tidak Tersedia',
                'timeout' => '⏰ Waktu Permintaan Habis',
                default => '🔵 Akses Halaman Web',
            };

            $color = match ($log->status) {
                'granted' => 0x10B981, // Emerald Green
                'denied' => 0xEF4444,  // Red
                'unavailable', 'timeout' => 0xF59E0B, // Amber
                default => 0x3B82F6,   // Blue
            };

            $fields = [
                [
                    'name' => '📄 Halaman Dikunjungi',
                    'value' => "**" . ($log->page_title ?: 'SDN 4 Sebatu') . "**\n`" . ($log->page_url ?: '/') . "`",
                    'inline' => false,
                ],
                [
                    'name' => '📍 Status Izin Lokasi',
                    'value' => $statusEmoji,
                    'inline' => true,
                ],
            ];

            if ($log->latitude && $log->longitude) {
                $gmapsLink = "https://www.google.com/maps?q={$log->latitude},{$log->longitude}";
                $fields[] = [
                    'name' => '🗺️ Titik Koordinat GPS',
                    'value' => "📍 Latitude: `{$log->latitude}`\n📍 Longitude: `{$log->longitude}`\n🎯 Akurasi: `±" . round($log->accuracy ?: 0) . " meter`\n👉 [**Buka Titik Lokasi di Google Maps**]({$gmapsLink})",
                    'inline' => false,
                ];
            }

            $fields[] = [
                'name' => '🖥️ Informasi Pengunjung',
                'value' => "• **IP Address:** `{$log->ip_address}`\n• **Perangkat:** `{$log->device}`\n• **Sistem Operasi:** `{$log->os}`\n• **Browser:** `{$log->browser}`",
                'inline' => false,
            ];

            $payload = [
                'username' => 'SDN 4 Sebatu Visitor Bot',
                'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
                'embeds' => [
                    [
                        'title' => '🔔 Aktivitas Pengunjung Web SDN 4 Sebatu',
                        'description' => "Pengunjung baru mengakses website publik SDN 4 Sebatu.",
                        'color' => $color,
                        'fields' => $fields,
                        'footer' => [
                            'text' => 'SDN 4 Sebatu • Sebatu, Tegallalang, Gianyar',
                        ],
                        'timestamp' => now()->toIso8601String(),
                    ],
                ],
            ];

            $response = Http::timeout(5)->post($webhookUrl, $payload);

            return $response->successful();
        } catch (\Throwable $e) {
            Log::error('Failed to send Discord webhook log: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Parse User Agent into OS, Browser, and Device.
     */
    protected function parseUserAgent(string $ua): array
    {
        $device = 'Desktop / PC';
        if (preg_match('/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/i', $ua)) {
            $device = 'Tablet';
        } elseif (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android|iemobile|mobile)/i', $ua)) {
            $device = 'Mobile / Smartphone';
        }

        $os = 'Unknown OS';
        if (preg_match('/windows|win32/i', $ua)) $os = 'Windows';
        elseif (preg_match('/android/i', $ua)) $os = 'Android';
        elseif (preg_match('/iphone|ipad|ipod/i', $ua)) $os = 'iOS (Apple)';
        elseif (preg_match('/macintosh|mac os x/i', $ua)) $os = 'macOS';
        elseif (preg_match('/linux/i', $ua)) $os = 'Linux';

        $browser = 'Unknown Browser';
        if (preg_match('/edg/i', $ua)) $browser = 'Microsoft Edge';
        elseif (preg_match('/chrome|crios/i', $ua)) $browser = 'Google Chrome';
        elseif (preg_match('/firefox|fxios/i', $ua)) $browser = 'Mozilla Firefox';
        elseif (preg_match('/safari/i', $ua)) $browser = 'Safari';
        elseif (preg_match('/opera|opr/i', $ua)) $browser = 'Opera';

        return compact('device', 'os', 'browser');
    }
}
