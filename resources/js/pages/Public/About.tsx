import BrandLogo from '@/components/brand-logo';
import PublicFooter from '@/components/public-footer';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, CalendarCheck2, CheckCircle2, ClipboardCheck, QrCode, ShieldCheck, Sparkles, Users } from 'lucide-react';

const capabilities = [
    {
        icon: CalendarCheck2,
        title: 'Unified event lifecycle',
        text: 'Proposal, approval, publication, registration, attendance, certificates and reporting in one system.',
    },
    {
        icon: ShieldCheck,
        title: 'Role-based governance',
        text: 'Students, coordinators, faculty advisors and administrators each get a scoped workspace.',
    },
    { icon: QrCode, title: 'QR attendance', text: 'Every registration issues a unique QR ticket for fast, reliable venue check-in.' },
    { icon: CheckCircle2, title: 'Verified certificates', text: 'Certificates are generated from attendance records and remain easy to verify.' },
    { icon: Users, title: 'Clubs and departments', text: 'Campus communities can organise events with clear ownership and faculty oversight.' },
    { icon: BarChart3, title: 'Analytics that matter', text: 'Participation, attendance and feedback stay visible for better decisions.' },
];

export default function About() {
    return (
        <>
            <Head title="About EDU EVENTS" />
            <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
                        <BrandLogo href={route('home')} />
                        <nav className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
                            <Link href={route('home')}>Home</Link>
                            <Link href={route('events.index')}>Events</Link>
                            <Link href={route('gallery.index')}>Gallery</Link>
                            <Link href={route('about')} className="font-semibold text-blue-900">
                                About
                            </Link>
                            <Link href={route('contact')}>Contact</Link>
                        </nav>
                        <Link href={route('login')} className="text-sm font-medium text-slate-600">
                            Log in
                        </Link>
                    </div>
                </header>
                <main>
                    <section className="relative overflow-hidden bg-[#071b35] text-white">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(52,211,153,.18),transparent_30%),linear-gradient(135deg,#071b35,#0c2b4c)]" />
                        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-28">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-300 uppercase">About EDU EVENTS</p>
                                <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
                                    One platform for every university event.
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                                    EDU EVENTS brings the full academic event journey into one clear, auditable space, replacing scattered notice boards,
                                    spreadsheets and paper attendance registers.
                                </p>
                                <div className="mt-9 flex flex-wrap gap-3">
                                    <Link
                                        href={route('events.index')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
                                    >
                                        Browse events <Sparkles className="size-4" />
                                    </Link>
                                    <Link
                                        href={route('contact')}
                                        className="rounded-xl border border-white/25 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                                    >
                                        Contact the office
                                    </Link>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                                <p className="text-sm font-medium text-emerald-300">A more connected campus</p>
                                <div className="mt-6 space-y-5">
                                    {[
                                        'Discover what matters to you',
                                        'Register with a clear digital pass',
                                        'Check in without paper queues',
                                        'Keep recognition beyond event day',
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-3 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                                            <CheckCircle2 className="size-5 shrink-0 text-emerald-300" />
                                            <span className="text-slate-100">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Built for the whole university</p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything needed to move from idea to impact.</h2>
                        </div>
                        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {capabilities.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="border-t border-slate-200 pt-5">
                                    <Icon className="size-6 text-blue-900" />
                                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8 lg:py-24">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">A shared standard</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Clear ownership. Better participation.</h2>
                                <p className="mt-5 leading-7 text-slate-500">
                                    Students find their next opportunity, coordinators keep every handoff visible, and faculty advisors can review
                                    activity with confidence.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-[#071b35] p-5 text-white">
                                    <ClipboardCheck className="size-6 text-emerald-300" />
                                    <p className="mt-8 text-sm font-semibold">Plan</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">Create and approve programmes with context.</p>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-5 text-slate-900">
                                    <Users className="size-6 text-emerald-700" />
                                    <p className="mt-8 text-sm font-semibold">Participate</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">Make registration and attendance effortless.</p>
                                </div>
                                <div className="rounded-2xl bg-blue-50 p-5 text-slate-900">
                                    <BarChart3 className="size-6 text-blue-900" />
                                    <p className="mt-8 text-sm font-semibold">Learn</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">Use feedback and analytics to improve.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
