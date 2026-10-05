import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * LocationTracker Component
 * Automatically requests browser geolocation permission on public web pages
 * and reports the visitor's page, IP, and location coordinates to backend & Discord Webhook.
 */
export default function LocationTracker() {
    const hasTrackedRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' || hasTrackedRef.current) return;
        hasTrackedRef.current = true;

        const sendLog = async (payload) => {
            try {
                await axios.post('/api/visitor-log', {
                    page_url: window.location.href,
                    page_title: document.title || 'SDN 4 Sebatu',
                    ...payload,
                }, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Accept: 'application/json',
                    },
                });
            } catch (err) {
                // Silently handle logging failures to never break visitor UX
                console.debug('Visitor log error:', err);
            }
        };

        // If Geolocation API is supported in visitor's browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Permission Granted by Visitor
                    sendLog({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        status: 'granted',
                    });
                },
                (error) => {
                    let status = 'unavailable';
                    if (error.code === error.PERMISSION_DENIED) {
                        status = 'denied';
                    } else if (error.code === error.TIMEOUT) {
                        status = 'timeout';
                    }
                    // Permission Denied or Unavailable
                    sendLog({ status });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            // Geolocation Not Supported
            sendLog({ status: 'unavailable' });
        }
    }, []);

    return null;
}
