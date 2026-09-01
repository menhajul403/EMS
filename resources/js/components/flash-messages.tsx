import { usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FlashMessages() {
    const { flash } = usePage().props as any;
    const [dismissed, setDismissed] = useState<string | null>(null);
    const type = flash?.success ? 'success' : 'error';
    const message = flash?.[type];
    const messageKey = `${type}:${message}`;

    useEffect(() => {
        if (!message) {
            return;
        }

        setDismissed(null);
        const timeout = window.setTimeout(() => setDismissed(messageKey), 3000);

        return () => window.clearTimeout(timeout);
    }, [messageKey, message]);

    if ((!flash?.success && !flash?.error) || !message || dismissed === messageKey) {
        return null;
    }

    return (
        <div className="px-6 pt-4">
            <div
                role="status"
                className={`relative flex items-start gap-3 overflow-hidden rounded-lg border px-4 py-3 text-sm ${
                    type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-red-200 bg-red-50 text-red-800'
                }`}
            >
                {type === 'success' ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <AlertCircle className="mt-0.5 size-4 shrink-0" />}
                <span className="flex-1">{message}</span>
                <button
                    type="button"
                    onClick={() => setDismissed(messageKey)}
                    className="rounded p-0.5 opacity-70 transition hover:bg-black/5 hover:opacity-100"
                    aria-label="Dismiss message"
                >
                    <X className="size-4" />
                </button>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[flash-progress_3s_linear_forwards] bg-current opacity-40" />
            </div>
        </div>
    );
}