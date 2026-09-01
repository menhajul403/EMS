import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, ChevronRight, Clock3, Filter, MapPin, RotateCcw, Search } from 'lucide-react';

const fallbackImages = [
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
];

export default function Index({ events, categories, departments, filters }: any) {
    function applyFilters(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.get(route('events.index'), Object.fromEntries(formData.entries()), { preserveState: true });
    }

    function resetFilters() {
        router.get(route('events.index'));
    }

    return (
        <>
            <Head title="Browse Events" />
            <div className="public-page min-h-screen bg-background text-foreground">
                <PublicHeader active="events" />
                <main className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Event discovery</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">University events</h1>
                        <p className="mt-4 text-lg leading-8 text-slate-500">
                            {events.total ?? events.data?.length ?? 0} events match your filters across {departments.length} departments and{' '}
                            {categories.length} categories.
                        </p>
                    </div>
                    <form onSubmit={applyFilters} className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2 font-semibold">
                                <Filter className="size-4 text-emerald-600" />
                                Filters
                            </div>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-800"
                            >
                                <RotateCcw className="size-3.5" />
                                Reset filters
                            </button>
                        </div>
                        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <label className="text-sm font-medium text-slate-700 lg:col-span-2">
                                Search
                                <div className="relative mt-2">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        name="search"
                                        defaultValue={filters.search || ''}
                                        placeholder="Search by title or description"
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-10 text-sm ring-emerald-200 outline-none focus:ring-2"
                                    />
                                </div>
                            </label>
                            <label className="text-sm font-medium text-slate-700">
                                Category
                                <select
                                    name="category_id"
                                    defaultValue={filters.category_id || ''}
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                                    <option value="">All categories</option>
                                    {categories.map((category: any) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="text-sm font-medium text-slate-700">
                                Department
                                <select
                                    name="department_id"
                                    defaultValue={filters.department_id || ''}
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                                    <option value="">All departments</option>
                                    {departments.map((department: any) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mt-4 flex flex-wrap items-end gap-4">
                            <label className="text-sm font-medium text-slate-700">
                                Date
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={filters.date || ''}
                                    className="mt-2 block h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                                />
                            </label>
                            <button
                                type="submit"
                                className="h-11 rounded-lg bg-blue-900 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                                Apply filters
                            </button>
                        </div>
                    </form>
                    {events.data?.length ? (
                        <div className="mt-10 space-y-5">
                            {events.data.map((event: any, index: number) => (
                                <article
                                    key={event.id}
                                    className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[280px_1fr]"
                                >
                                    <div className="relative min-h-52">
                                        <img
                                            src={event.banner ? `/storage/${event.banner}` : fallbackImages[index % fallbackImages.length]}
                                            alt={event.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-900">
                                            {event.category?.name ?? 'Campus event'}
                                        </span>
                                        <span className="absolute top-4 right-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-950">
                                            Published
                                        </span>
                                    </div>
                                    <div className="p-6 lg:p-7">
                                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            {event.department?.name || 'University community'}
                                        </p>
                                        <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-blue-800">{event.title}</h2>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{event.short_description}</p>
                                        <div className="mt-6 grid gap-3 text-sm text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
                                            <span className="inline-flex items-center gap-2">
                                                <CalendarDays className="size-4 text-emerald-600" />
                                                {event.start_at
                                                    ? new Date(event.start_at).toLocaleDateString('en-GB', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : 'Date TBA'}
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <Clock3 className="size-4 text-emerald-600" />
                                                {event.start_at
                                                    ? new Date(event.start_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                                                    : 'Time TBA'}
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <MapPin className="size-4 text-emerald-600" />
                                                {event.venue?.name || 'Main campus'}
                                            </span>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-xs font-medium text-slate-500">Open for registration</span>
                                            <Link
                                                href={route('events.show', event.slug)}
                                                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900"
                                            >
                                                View details <ChevronRight className="size-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">
                            No published events found.
                        </div>
                    )}
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
