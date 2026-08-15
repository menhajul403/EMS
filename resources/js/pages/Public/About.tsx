import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About CampusConnect" />
            <div className="min-h-screen bg-gray-50">
                <header className="border-b bg-white">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href={route('home')} className="text-xl font-semibold">
                            CampusConnect
                        </Link>
                        <nav className="flex gap-4 text-sm">
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')}>Gallery</Link>
                            <Link href={route('contact')}>Contact</Link>
                        </nav>
                    </div>
                </header>
                <main className="container mx-auto max-w-3xl px-6 py-12">
                    <h1 className="text-3xl font-bold">About CampusConnect</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        CampusConnect is a smart university event management platform — one place for workshops, seminars,
                        hackathons, cultural programs, sports events, and departmental activities.
                    </p>
                    <p className="mt-4 text-gray-600">
                        Students can discover events, register, check in with QR codes, earn certificates, and share feedback.
                        Coordinators manage the full event lifecycle from draft to publication. Faculty advisors review and approve
                        departmental events before they go live.
                    </p>
                </main>
            </div>
        </>
    );
}
