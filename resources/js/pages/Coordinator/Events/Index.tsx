import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ events }: any) {
    function submit(eventId: number) {
        router.post(route('coordinator.events.submit', eventId));
    }

    function publish(eventId: number) {
        router.post(route('coordinator.events.publish', eventId));
    }

    function remove(eventId: number) {
        if (window.confirm('Delete this event? This action cannot be undone.')) {
            router.delete(route('coordinator.events.destroy', eventId));
        }
    }

    return (
        <AppLayout>
            <Head title="My Events" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My Events</h1>
                    <Link href={route('coordinator.events.create')} className="rounded bg-blue-600 px-4 py-2 text-white">
                        Create Event
                    </Link>
                </div>

                {events.data?.length ? (
                    <ul className="space-y-3">
                        {events.data.map((event: any) => (
                            <li key={event.id} className="rounded border p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="font-semibold">{event.title}</div>
                                        <div className="text-sm text-gray-500">{event.short_description}</div>
                                        <div className="mt-2 text-xs uppercase tracking-wide text-gray-600">Status: {event.status}</div>
                                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                            <Link href={route('coordinator.events.registrations', event.id)} className="text-blue-600">
                                                Registrations
                                            </Link>
                                            <Link href={route('coordinator.events.feedback', event.id)} className="text-blue-600">
                                                Feedback
                                            </Link>
                                            <Link href={route('coordinator.events.gallery', event.id)} className="text-blue-600">
                                                Gallery
                                            </Link>
                                            <Link href={route('coordinator.events.certificates', event.id)} className="text-blue-600">
                                                Certificates
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <Link href={route('coordinator.events.edit', event.id)} className="text-blue-600">
                                            Edit
                                        </Link>
                                        <button type="button" onClick={() => remove(event.id)} className="text-left text-red-600">
                                            Delete
                                        </button>
                                        {['draft', 'rejected'].includes(event.status) && (
                                            <button type="button" onClick={() => submit(event.id)} className="text-left text-green-600">
                                                Submit for Approval
                                            </button>
                                        )}
                                        {event.status === 'approved' && (
                                            <button type="button" onClick={() => publish(event.id)} className="text-left text-green-600">
                                                Publish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-500">No events yet.</div>
                )}
            </div>
        </AppLayout>
    );
}
