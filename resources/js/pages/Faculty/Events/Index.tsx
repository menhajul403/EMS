import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ events }: any) {
    function approve(eventId: number) {
        router.post(route('faculty.events.approve', eventId));
    }

    function reject(eventId: number) {
        const reason = window.prompt('Rejection reason:');
        if (reason) {
            router.post(route('faculty.events.reject', eventId), { reason });
        }
    }

    function requestChanges(eventId: number) {
        const reason = window.prompt('Requested changes:');
        if (reason) {
            router.post(route('faculty.events.request-changes', eventId), { reason });
        }
    }

    return (
        <AppLayout>
            <Head title="Faculty Approvals" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-semibold">Department Event Approvals</h1>

                {events.data?.length ? (
                    <ul className="space-y-3">
                        {events.data.map((event: any) => (
                            <li key={event.id} className="rounded border p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="font-semibold">{event.title}</div>
                                        <div className="text-sm text-gray-500">{event.short_description}</div>
                                        <div className="mt-2 text-xs uppercase tracking-wide text-gray-600">Status: {event.status}</div>
                                        {event.rejection_reason && (
                                            <div className="mt-2 text-sm text-amber-700">Note: {event.rejection_reason}</div>
                                        )}
                                    </div>
                                    {event.status === 'pending' && (
                                        <div className="flex flex-col gap-2 text-sm">
                                            <button type="button" onClick={() => approve(event.id)} className="text-left text-green-600">
                                                Approve
                                            </button>
                                            <button type="button" onClick={() => reject(event.id)} className="text-left text-red-600">
                                                Reject
                                            </button>
                                            <button type="button" onClick={() => requestChanges(event.id)} className="text-left text-amber-600">
                                                Request Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-500">No events awaiting your review.</div>
                )}
            </div>
        </AppLayout>
    );
}
