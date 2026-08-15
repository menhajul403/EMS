import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ registrations }: any) {
    return (
        <AppLayout>
            <Head title="My Registrations" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-semibold">My Registrations</h1>

                {registrations.data?.length ? (
                    <ul className="space-y-3">
                        {registrations.data.map((registration: any) => (
                            <li key={registration.id} className="rounded border p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="font-semibold">{registration.event?.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {registration.event?.start_at
                                                ? new Date(registration.event.start_at).toLocaleString()
                                                : 'Date TBA'}
                                        </div>
                                        <div className="mt-1 text-xs uppercase tracking-wide text-gray-600">
                                            Status: {registration.status}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm">
                                        {registration.status === 'registered' && (
                                            <>
                                                <Link href={route('student.registrations.qr', registration.id)} className="text-blue-600">
                                                    View QR
                                                </Link>
                                                <Link
                                                    href={route('student.events.cancel', registration.event_id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-left text-red-600"
                                                >
                                                    Cancel
                                                </Link>
                                            </>
                                        )}
                                        {registration.attended_at && (
                                            <Link
                                                href={route('certificates.generate', registration.id)}
                                                className="text-green-600"
                                            >
                                                Download Certificate
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="rounded border border-dashed p-8 text-center text-gray-500">
                        You have not registered for any events yet.{' '}
                        <Link href={route('events.index')} className="text-blue-600">
                            Browse events
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
