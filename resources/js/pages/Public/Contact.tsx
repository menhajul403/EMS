import { Head, Link } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="min-h-screen bg-gray-50">
                <header className="border-b bg-white">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href={route('home')} className="text-xl font-semibold">
                            CampusConnect
                        </Link>
                        <nav className="flex gap-4 text-sm">
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')}>Gallery</Link>
                            <Link href={route('about')}>About</Link>
                        </nav>
                    </div>
                </header>
                <main className="container mx-auto max-w-3xl px-6 py-12">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <div className="mt-6 space-y-3 text-gray-700">
                        <p>Demo University — Office of Student Affairs</p>
                        <p>Email: support@campusconnect.com</p>
                        <p>Phone: +880 1234 567890</p>
                        <p>Address: Demo University Campus, Dhaka, Bangladesh</p>
                    </div>
                </main>
            </div>
        </>
    );
}
