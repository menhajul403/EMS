import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Events({ events, filters, categories }: any) {
    function applyFilters(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get(route('reports.events'), Object.fromEntries(formData.entries()), { preserveState: true });
    }

    return (
        <AppLayout>
            <Head title="Event Report" />
            <div className="mx-auto max-w-5xl p-4">
                <Link href={route('reports.index')} className="text-sm text-blue-600">Back to reports</Link>
                <h1 className="mt-4 text-2xl font-semibold">Event Report</h1>

                <form onSubmit={applyFilters} className="mt-4 grid gap-3 rounded border p-4 md:grid-cols-5">
                    <select name="status" defaultValue={filters.status || ''} className="rounded border px-3 py-2">
                        <option value="">All statuses</option>
                        {['draft', 'pending', 'approved', 'published', 'ongoing', 'completed', 'rejected', 'cancelled', 'archived'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select name="category_id" defaultValue={filters.category_id || ''} className="rounded border px-3 py-2">
                        <option value="">All categories</option>
                        {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <input type="date" name="from" defaultValue={filters.from || ''} className="rounded border px-3 py-2" />
                    <input type="date" name="to" defaultValue={filters.to || ''} className="rounded border px-3 py-2" />
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Filter</button>
                </form>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Title</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Start</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.data?.map((event: any) => (
                                <tr key={event.id} className="border-b">
                                    <td className="p-2">{event.title}</td>
                                    <td className="p-2">{event.status}</td>
                                    <td className="p-2">{event.category?.name}</td>
                                    <td className="p-2">{event.start_at ? new Date(event.start_at).toLocaleString() : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
