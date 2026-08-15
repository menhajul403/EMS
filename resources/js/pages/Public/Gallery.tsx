import { Head, Link } from '@inertiajs/react';

export default function Gallery({ galleries }: any) {
    return (
        <>
            <Head title="Event Gallery" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="border-b bg-white dark:bg-gray-800">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href={route('home')} className="text-xl font-semibold">
                            CampusConnect
                        </Link>
                        <nav className="flex gap-4 text-sm">
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('about')}>About</Link>
                            <Link href={route('contact')}>Contact</Link>
                        </nav>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-10">
                    <h1 className="mb-6 text-3xl font-bold">Event Gallery</h1>
                    {galleries.data?.length ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {galleries.data.map((gallery: any) => (
                                <figure key={gallery.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                                    <img src={gallery.url} alt={gallery.caption || gallery.event?.title} className="h-48 w-full object-cover" />
                                    <figcaption className="p-3 text-sm">
                                        <div className="font-medium">{gallery.event?.title}</div>
                                        {gallery.caption && <div className="text-gray-500">{gallery.caption}</div>}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded border border-dashed p-12 text-center text-gray-500">
                            No gallery images yet. Check back after upcoming events.
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
