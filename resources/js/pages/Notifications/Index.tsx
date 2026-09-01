import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ notifications, unreadCount }: any) {
    return (
        <AppLayout>
            <Head title="Notifications" />
            <div className="mx-auto max-w-3xl p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Notifications</h1>
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            onClick={() => router.post(route('notifications.read-all'))}
                            className="text-sm text-blue-600"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {notifications.data?.length ? (
                    <ul className="space-y-3">
                        {notifications.data.map((notification: any) => (
                            <li
                                key={notification.id}
                                className={`rounded border border-border p-4 ${notification.read_at ? 'bg-card' : 'bg-secondary/30'}`}
                            >
                                <div className="font-medium">{notification.data.title}</div>
                                <div className="mt-1 text-sm text-muted-foreground">{notification.data.message}</div>
                                {(notification.data.action_url || notification.data.event_slug) && (
                                    <Link
                                        href={
                                            notification.data.action_url ||
                                            (notification.data.type === 'event_submitted'
                                                ? route('faculty.events.index')
                                                : ['event_changes_requested', 'event_rejected'].includes(notification.data.type)
                                                  ? route('coordinator.events.edit', notification.data.event_id)
                                                  : route('events.show', notification.data.event_slug))
                                        }
                                        className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                                    >
                                        View event
                                    </Link>
                                )}
                                {!notification.read_at && (
                                    <button
                                        type="button"
                                        onClick={() => router.patch(route('notifications.read', notification.id))}
                                        className="mt-2 ml-3 text-sm text-blue-600"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="rounded border border-dashed p-8 text-center text-gray-500">No notifications yet.</div>
                )}
            </div>
        </AppLayout>
    );
}
