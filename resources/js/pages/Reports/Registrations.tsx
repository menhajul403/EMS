import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Registrations({ registrations, filters, events }: any) {
    function applyFilters(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get(route('reports.registrations'), Object.fromEntries(formData.entries()), { preserveState: true });
    }

    const pdfUrl = (() => {
        const params = new URLSearchParams();

        if (filters.event_id) params.set('event_id', String(filters.event_id));
        if (filters.status) params.set('status', String(filters.status));

        const query = params.toString();
        return query ? `${route('reports.registrations.export')}?${query}` : route('reports.registrations.export');
    })();

    return (
        <AppLayout>
            <Head title="Registration Report" />
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={route('reports.index')} className="text-sm text-blue-600">Back to reports</Link>
                        <h1 className="mt-4 text-2xl font-semibold">Registration Report</h1>
                    </div>
                    <a href={pdfUrl} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Download PDF
                    </a>
                </div>

                <form onSubmit={applyFilters} className="mt-4 grid gap-3 rounded border p-4 md:grid-cols-3">
                    <select name="event_id" defaultValue={filters.event_id || ''} className="rounded border px-3 py-2">
                        <option value="">All events</option>
                        {events.map((e: any) => <option key={e.id} value={e.id}>{e.title}</option>)}
                    </select>
                    <select name="status" defaultValue={filters.status || ''} className="rounded border px-3 py-2">
                        <option value="">All statuses</option>
                        {['registered', 'cancelled', 'attended', 'waitlisted'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Filter</button>
                </form>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Student</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Student ID</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">Department</th>
                                <th className="p-2">Event</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Attended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.data?.map((r: any) => (
                                <tr key={r.id} className="border-b">
                                    <td className="p-2">{r.user?.name}</td>
                                    <td className="p-2">{r.user?.email}</td>
                                    <td className="p-2">{r.user?.student_id || '—'}</td>
                                    <td className="p-2">{r.user?.phone || '—'}</td>
                                    <td className="p-2">{r.user?.department?.name || '—'}</td>
                                    <td className="p-2">{r.event?.title}</td>
                                    <td className="p-2">{r.status}</td>
                                    <td className="p-2">{r.attended_at ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
