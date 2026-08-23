import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ events, categories, departments, filters }: any) {
    function applyFilters(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.get(route('events.index'), Object.fromEntries(formData.entries()), { preserveState: true });
    }

    return (
        <AppLayout>
            <Head title="Browse Events" />
            <div className="mx-auto max-w-6xl p-4">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Browse Events</h1>
                    <Link href={route('home')} className="text-sm text-blue-600">
                        Back to Home
                    </Link>
                </div>

                <form onSubmit={applyFilters} className="mb-6 grid gap-3 rounded border p-4 md:grid-cols-4">
                    <input
                        name="search"
                        defaultValue={filters.search || ''}
                        placeholder="Search events"
                        className="rounded border px-3 py-2"
                    />
                    <select name="category_id" defaultValue={filters.category_id || ''} className="rounded border px-3 py-2">
                        <option value="">All categories</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select name="department_id" defaultValue={filters.department_id || ''} className="rounded border px-3 py-2">
                        <option value="">All departments</option>
                        {departments.map((department: any) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                        Filter
                    </button>
                </form>

                {events.data?.length ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {events.data.map((event: any) => (
                            <article key={event.id} className="rounded border p-4">
                                <img
                                    src={event.banner ? `/storage/${event.banner}` : 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80'}
                                    alt=""
                                    className="mb-4 h-40 w-full rounded object-cover"
                                />
                                <h2 className="text-lg font-semibold">{event.title}</h2>
                                <p className="mt-1 text-sm text-gray-500">{event.short_description}</p>
                                <div className="mt-3 text-sm text-gray-600">
                                    {event.start_at ? new Date(event.start_at).toLocaleString() : 'Date TBA'}
                                </div>
                                <Link href={route('events.show', event.slug)} className="mt-4 inline-block text-blue-600">
                                    View details
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded border border-dashed p-8 text-center text-gray-500">No published events found.</div>
                )}
            </div>
        </AppLayout>
    );
}
