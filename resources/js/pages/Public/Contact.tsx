import BrandLogo from '@/components/brand-logo';
import PublicFooter from '@/components/public-footer';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
                        <BrandLogo href={route('home')} />
                        <nav className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
                            <Link href={route('home')}>Home</Link>
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')}>Gallery</Link>
                            <Link href={route('about')}>About</Link>
                            <Link href={route('contact')} className="font-semibold text-blue-900">
                                Contact
                            </Link>
                        </nav>
                        <Link href={route('login')} className="text-sm font-medium text-slate-600">
                            Log in
                        </Link>
                    </div>
                </header>
                <main>
                    <section className="bg-[#071b35] text-white">
                        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                            <p className="text-sm font-semibold tracking-[.18em] text-emerald-300 uppercase">Contact</p>
                            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Talk to the event office.</h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                                Event proposals, registration problems, certificate reissues and venue bookings. We are here to help keep campus
                                moving.
                            </p>
                        </div>
                    </section>
                    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <Send className="size-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold tracking-[.16em] text-emerald-700 uppercase">Start a conversation</p>
                                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">How can we help?</h2>
                                </div>
                            </div>
                            <p className="mt-5 max-w-xl leading-7 text-slate-500">
                                For the fastest response, include your event name, registration ID or the date of your programme when you reach out.
                            </p>
                            <a
                                href="mailto:events@campusconnect.edu"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
                            >
                                Email the event office <ArrowUpRight className="size-4" />
                            </a>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <a
                                href="mailto:events@campusconnect.edu"
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <Mail className="size-5 text-emerald-600" />
                                <p className="mt-8 text-sm font-semibold">Email</p>
                                <p className="mt-1 text-sm text-slate-500">events@campusconnect.edu</p>
                            </a>
                            <a
                                href="tel:+8801711000101"
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <Phone className="size-5 text-emerald-600" />
                                <p className="mt-8 text-sm font-semibold">Phone</p>
                                <p className="mt-1 text-sm text-slate-500">+880 1711 000101</p>
                            </a>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <MapPin className="size-5 text-emerald-600" />
                                <p className="mt-8 text-sm font-semibold">Office</p>
                                <p className="mt-1 text-sm text-slate-500">Academic Building 1, Room 108</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <Clock3 className="size-5 text-emerald-600" />
                                <p className="mt-8 text-sm font-semibold">Hours</p>
                                <p className="mt-1 text-sm text-slate-500">Sun-Thu, 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </section>
                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
                            <div>
                                <p className="text-sm font-semibold tracking-[.16em] text-emerald-700 uppercase">Need something specific?</p>
                                <h2 className="mt-2 text-2xl font-semibold">Find your next campus event.</h2>
                            </div>
                            <Link href={route('events.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
                                Browse events <ArrowUpRight className="size-4" />
                            </Link>
                        </div>
                    </section>
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
