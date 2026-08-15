import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const page = usePage();
    const { auth, events = [] } = page.props as any;

    return (
        <>
            <Head title="CampusConnect — Home" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="border-b bg-white dark:bg-gray-800">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="text-xl font-semibold">CampusConnect</div>
                        <nav className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-200">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-200">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="ml-2 rounded border px-3 py-1 text-sm bg-white dark:bg-gray-700">
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <section>
                            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Discover university events</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Find workshops, seminars, and student activities. Register, attend and earn certificates.</p>
                            <div className="flex gap-3">
                                <Link href="/events" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">
                                    Browse Events
                                </Link>
                                <Link href="/register" className="inline-block rounded border px-4 py-2 text-gray-700 bg-white">
                                    Get Started
                                </Link>
                            </div>
                        </section>

                        <aside>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Upcoming Events</h3>
                                {events.length ? (
                                    <ul className="space-y-3">
                                        {events.map((e: any) => (
                                            <li key={e.id} className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="font-medium text-gray-800 dark:text-gray-100">{e.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{e.short_description}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">{e.start_at ? new Date(e.start_at).toLocaleDateString() : ''}</div>
                                                    <Link href={`/events/${e.slug || e.id}`} className="text-sm text-blue-600">View</Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-sm text-gray-500">No upcoming events.</div>
                                )}
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}
