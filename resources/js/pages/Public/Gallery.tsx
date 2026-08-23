import BrandLogo from '@/components/brand-logo';
import PublicFooter from '@/components/public-footer';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Camera, Image as ImageIcon } from 'lucide-react';

export default function Gallery({ galleries }: any) {
    const images = galleries.data || [];

    return (
        <>
            <Head title="Event Gallery" />
            <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
                        <BrandLogo href={route('home')} />
                        <nav className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
                            <Link href={route('home')}>Home</Link>
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')} className="font-semibold text-blue-900">
                                Gallery
                            </Link>
                            <Link href={route('about')}>About</Link>
                            <Link href={route('contact')}>Contact</Link>
                        </nav>
                        <Link href={route('login')} className="text-sm font-medium text-slate-600">
                            Log in
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Gallery</p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Moments from campus</h1>
                            <p className="mt-4 text-lg leading-8 text-slate-500">
                                {galleries.total ?? images.length} photos from university events, captured by the people who make campus life happen.
                            </p>
                        </div>
                        <Link href={route('events.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
                            Explore events <ArrowUpRight className="size-4" />
                        </Link>
                    </div>
                    <div className="mt-10 flex items-center justify-between border-y border-slate-200 py-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                            <Camera className="size-4 text-emerald-600" />
                            Event albums
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <ImageIcon className="size-4 text-emerald-600" />
                            {galleries.total ?? images.length} photos
                        </span>
                    </div>
                    {images.length ? (
                        <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-3 lg:grid-cols-4">
                            {images.map((gallery: any, index: number) => (
                                <figure
                                    key={gallery.id}
                                    className={`group relative overflow-hidden rounded-2xl bg-slate-200 ${index % 7 === 0 ? 'row-span-2' : ''}`}
                                >
                                    <img
                                        src={gallery.url}
                                        alt={gallery.caption || gallery.event?.title || 'Campus event'}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent p-4 pt-12 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <p className="text-xs font-semibold text-emerald-300">{gallery.event?.title || 'Campus event'}</p>
                                        {gallery.caption && <figcaption className="mt-1 line-clamp-2 text-sm">{gallery.caption}</figcaption>}
                                    </div>
                                    <div className="absolute inset-x-3 bottom-3 rounded-lg bg-slate-950/65 px-3 py-2 text-xs text-white backdrop-blur-sm transition group-hover:opacity-0">
                                        <p className="truncate font-medium">{gallery.event?.title || 'Campus event'}</p>
                                    </div>
                                </figure>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">
                            No gallery images yet. Check back after upcoming events.
                        </div>
                    )}
                    {galleries.links?.length > 3 && (
                        <nav className="mt-10 flex justify-center gap-2">
                            {galleries.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded-lg border px-3 py-2 text-sm ${link.active ? 'border-blue-900 bg-blue-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    )}
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
