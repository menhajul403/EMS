import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth, events = [], stats = {}, categories = [], gallery = [] } = usePage().props as any;

    return (
        <>
            <Head title="CampusConnect — One platform for every university event" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <header className="border-b bg-white dark:bg-slate-800">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="text-xl font-bold text-blue-700">CampusConnect</div>
                        <nav className="flex items-center gap-4 text-sm">
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')}>Gallery</Link>
                            <Link href={route('about')}>About</Link>
                            <Link href={route('contact')}>Contact</Link>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="rounded bg-blue-600 px-3 py-1 text-white">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>Log in</Link>
                                    <Link href={route('register')} className="rounded border px-3 py-1">Register</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
                    <div className="container mx-auto px-6 py-20">
                        <h1 className="text-4xl font-bold md:text-5xl">One platform for every university event.</h1>
                        <p className="mt-4 max-w-2xl text-lg text-blue-100">
                            Discover workshops, seminars, hackathons, and cultural programs. Register, attend with QR codes, earn certificates, and share feedback.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <Link href={route('events.index')} className="rounded bg-white px-5 py-2 font-medium text-blue-700">Browse Events</Link>
                            <Link href={route('register')} className="rounded border border-white px-5 py-2">Get Started</Link>
                        </div>
                    </div>
                </section>

                <main className="container mx-auto px-6 py-12 space-y-16">
                    <section>
                        <h2 className="mb-6 text-2xl font-semibold">University at a glance</h2>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-xl border bg-white p-6 dark:bg-slate-800"><div className="text-sm text-gray-500">Published Events</div><div className="text-3xl font-bold">{stats.events ?? 0}</div></div>
                            <div className="rounded-xl border bg-white p-6 dark:bg-slate-800"><div className="text-sm text-gray-500">Categories</div><div className="text-3xl font-bold">{stats.categories ?? 0}</div></div>
                            <div className="rounded-xl border bg-white p-6 dark:bg-slate-800"><div className="text-sm text-gray-500">Departments</div><div className="text-3xl font-bold">{stats.departments ?? 0}</div></div>
                            <div className="rounded-xl border bg-white p-6 dark:bg-slate-800"><div className="text-sm text-gray-500">Students</div><div className="text-3xl font-bold">{stats.students ?? 0}</div></div>
                        </div>
                    </section>

                    <section className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-4 text-2xl font-semibold">Upcoming Events</h2>
                            {events.length ? (
                                <ul className="space-y-3">
                                    {events.map((e: any) => (
                                        <li key={e.id} className="rounded-lg border bg-white p-4 dark:bg-slate-800">
                                            <div className="font-medium">{e.title}</div>
                                            <div className="text-sm text-gray-500">{e.short_description}</div>
                                            <div className="mt-2 flex justify-between text-sm">
                                                <span>{e.start_at ? new Date(e.start_at).toLocaleDateString() : 'Date TBA'}</span>
                                                <Link href={route('events.show', e.slug)} className="text-blue-600">View</Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded border border-dashed p-8 text-center text-gray-500">No upcoming events.</div>
                            )}
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-semibold">Event Categories</h2>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((c: any) => (
                                    <Link key={c.id} href={route('events.index', { category_id: c.id })} className="rounded-full border bg-white px-4 py-2 text-sm dark:bg-slate-800">
                                        {c.name}
                                    </Link>
                                ))}
                            </div>

                            <h2 className="mb-4 mt-8 text-2xl font-semibold">How It Works</h2>
                            <ol className="space-y-2 text-sm text-gray-600">
                                <li>1. Browse and register for published events</li>
                                <li>2. Show your QR code at check-in</li>
                                <li>3. Download your certificate after attendance</li>
                                <li>4. Submit feedback to improve future events</li>
                            </ol>
                        </div>
                    </section>

                    {gallery.length > 0 && (
                        <section>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Event Gallery</h2>
                                <Link href={route('gallery.index')} className="text-blue-600">View all</Link>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-6">
                                {gallery.map((item: any) => (
                                    <img key={item.id} src={item.url} alt="" className="h-24 w-full rounded-lg object-cover" />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <footer className="border-t bg-white py-8 dark:bg-slate-800">
                    <div className="container mx-auto px-6 text-center text-sm text-gray-500">
                        CampusConnect — Smart University Event Management Platform
                    </div>
                </footer>
            </div>
        </>
    );
}
