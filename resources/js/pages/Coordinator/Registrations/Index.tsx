import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ event, registrations, stats }: any) {
    return (
        <AppLayout>
            <Head title={`Registrations — ${event.title}`} />
            <div className="mx-auto max-w-5xl p-4">
                <Link href={route('coordinator.events.index')} className="text-sm text-blue-600">
                    Back to events
                </Link>
                <h1 className="mt-4 text-2xl font-semibold">Registrations: {event.title}</h1>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Registered</div>
                        <div className="text-2xl font-semibold">{stats.total}</div>
                    </div>
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Attended</div>
                        <div className="text-2xl font-semibold">{stats.attended}</div>
                    </div>
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Cancelled</div>
                        <div className="text-2xl font-semibold">{stats.cancelled}</div>
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Student</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Attended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.data?.map((registration: any) => (
                                <tr key={registration.id} className="border-b">
                                    <td className="p-2">{registration.user?.name}</td>
                                    <td className="p-2">{registration.status}</td>
                                    <td className="p-2">{registration.attended_at ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
