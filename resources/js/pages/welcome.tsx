import BrandLogo from '@/components/brand-logo';
import PublicFooter from '@/components/public-footer';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    ClipboardCheck,
    Clock3,
    MapPin,
    QrCode,
    Quote,
    ShieldCheck,
    Star,
    Users,
} from 'lucide-react';

const heroImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1900&q=88';
const featureImage = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85';

export default function Welcome() {
    const { auth, events = [], stats = {}, gallery = [], categories = [] } = usePage().props as any;
    const previewEvents = events.slice(0, 3);
    const categoryDescriptions: Record<string, string> = {
        Workshop: 'Hands-on skill building sessions',
        Seminar: 'Talks by academics and industry experts',
        Hackathon: 'Team based build sprints',
        'Programming Contest': 'Competitive programming events',
        'Cultural Event': 'Music, drama and festivals',
        Sports: 'Inter department tournaments',
        Career: 'Placement and career guidance',
        Training: 'Certified training programs',
        Competition: 'Project and innovation contests',
    };
    const galleryFallback = [
        heroImage,
        featureImage,
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85',
        heroImage,
        featureImage,
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    ];
    const testimonials = [
        {
            quote: 'I used to hear about workshops after they happened. Now everything is in one feed and my certificates are all in one place.',
            name: 'Nusrat Jahan',
            role: 'CSE, 4th year',
            initials: 'NJ',
        },
        {
            quote: 'Approving events takes minutes instead of days, and I can see departmental participation without asking for a report.',
            name: 'Dr. Tanvir Ahmed',
            role: 'Faculty Advisor, CSE',
            initials: 'TA',
        },
        {
            quote: 'QR attendance removed the paper registers entirely. Certificate generation for participants took one click.',
            name: 'Rakibul Hasan',
            role: 'President, Computer Club',
            initials: 'RH',
        },
    ];
    const features = [
        { icon: CalendarDays, title: 'Event operations', text: 'Create, approve and publish every campus moment from one calm workspace.' },
        { icon: Users, title: 'Smart registration', text: 'Make participation effortless with live capacity and clean event details.' },
        { icon: QrCode, title: 'QR attendance', text: 'A faster, more reliable check-in experience for event day.' },
        { icon: ShieldCheck, title: 'Digital certificates', text: 'Recognise student achievement with verifiable certificates.' },
        { icon: ClipboardCheck, title: 'Feedback loops', text: 'Turn student feedback into better programmes next semester.' },
        { icon: BarChart3, title: 'Clear analytics', text: 'See participation, attendance and engagement at a glance.' },
    ];

    return (
        <>
            <Head title="EDU EVENTS - Academic Event Management System" />
            <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur-md">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
                        <BrandLogo href={route('home')} dark />
                        <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
                            <Link href={route('home')} className="font-semibold text-[#0b477a]">
                                Home
                            </Link>
                            <Link href={route('events.index')} className="text-slate-600 transition hover:text-[#0b477a]">
                                Events
                            </Link>
                            <Link href={route('gallery.index')} className="text-slate-600 transition hover:text-[#0b477a]">
                                Gallery
                            </Link>
                            <Link href={route('about')} className="text-slate-600 transition hover:text-[#0b477a]">
                                About
                            </Link>
                            <Link href={route('contact')} className="text-slate-600 transition hover:text-[#0b477a]">
                                Contact
                            </Link>
                        </nav>
                        <div className="flex items-center gap-3 text-sm">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-[#0b477a] px-4 py-2 font-medium text-white transition hover:bg-[#08385f]"
                                >
                                    Open portal
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="hidden text-slate-700 transition hover:text-[#0b477a] sm:inline">
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-[#d4a72c] px-4 py-2 font-semibold text-[#071b35] transition hover:bg-[#e0b83e]"
                                    >
                                        Get started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <section className="relative isolate overflow-hidden bg-[#071b35] text-white">
                    <img
                        src={heroImage}
                        alt="Students collaborating at a university event"
                        className="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
                    />
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(5,23,48,.98)_0%,rgba(5,23,48,.9)_48%,rgba(5,23,48,.52)_100%)]" />
                    <div className="relative z-10 mx-auto grid min-h-[700px] max-w-7xl items-center gap-12 px-5 pt-32 pb-16 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:pb-20">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                                <span className="size-2 rounded-full bg-emerald-300" />
                                Smart University Event Management
                            </div>
                            <h1 className="max-w-xl text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl">
                                Discover.
                                <br />
                                Participate.
                                <br />
                                <span className="text-emerald-300">Achieve.</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                                One platform for every university event. Proposal, approval, registration, QR attendance, certificates and analytics —
                                end to end.
                            </p>
                            <div className="mt-9 flex flex-wrap gap-3">
                                <Link
                                    href={route('events.index')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                                >
                                    Explore events <ArrowRight className="size-4" />
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl border border-white/30 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                                >
                                    Get started
                                </Link>
                            </div>
                            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 text-sm text-slate-300 sm:grid-cols-4">
                                <div>
                                    <dt className="text-2xl font-semibold text-white">{stats.students || '10K+'}</dt>
                                    <dd>Students</dd>
                                </div>
                                <div>
                                    <dt className="text-2xl font-semibold text-white">{stats.events || '250+'}</dt>
                                    <dd>Events</dd>
                                </div>
                                <div>
                                    <dt className="text-2xl font-semibold text-white">{stats.categories || '35+'}</dt>
                                    <dd>Clubs</dd>
                                </div>
                                <div>
                                    <dt className="text-2xl font-semibold text-white">95%</dt>
                                    <dd>Satisfaction</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md lg:block">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-sm text-emerald-300">Coordinator dashboard</p>
                                    <p className="mt-1 text-xs text-slate-400">Live preview</p>
                                </div>
                                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">Live</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 py-5">
                                <div className="rounded-xl bg-white/10 p-3">
                                    <p className="text-xs text-slate-400">Events</p>
                                    <p className="mt-1 text-2xl font-semibold">{events.length || 5}</p>
                                </div>
                                <div className="rounded-xl bg-white/10 p-3">
                                    <p className="text-xs text-slate-400">Registrations</p>
                                    <p className="mt-1 text-2xl font-semibold">1,284</p>
                                </div>
                                <div className="rounded-xl bg-white/10 p-3">
                                    <p className="text-xs text-slate-400">Attendance</p>
                                    <p className="mt-1 text-2xl font-semibold">87%</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {(previewEvents.length
                                    ? previewEvents
                                    : [
                                          { title: 'AI & Machine Learning Workshop', category: { name: 'Workshop' } },
                                          { title: 'Inter University Programming Contest 2026', category: { name: 'Competition' } },
                                          { title: 'Career Development Seminar', category: { name: 'Seminar' } },
                                      ]
                                ).map((event: any, index: number) => (
                                    <div key={event.id || index} className="flex items-center justify-between rounded-xl bg-white/[.07] p-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">{event.title}</p>
                                            <p className="mt-1 text-xs text-slate-400">{event.category?.name || 'Campus event'} · Published</p>
                                        </div>
                                        <CheckCircle2 className="ml-3 size-4 shrink-0 text-emerald-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <main>
                    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Upcoming</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Next on campus</h2>
                                <p className="mt-3 text-slate-500">Register before the deadline to secure your seat and QR ticket.</p>
                            </div>
                            <Link href={route('events.index')} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800">
                                All events <ChevronRight className="size-4" />
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {events.slice(0, 6).map((event: any, index: number) => (
                                <Link
                                    key={event.id}
                                    href={route('events.show', event.slug)}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={
                                                event.banner
                                                    ? `/storage/${event.banner}`
                                                    : [
                                                          heroImage,
                                                          featureImage,
                                                          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
                                                      ][index % 3]
                                            }
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-900">
                                            {event.category?.name ?? 'Campus event'}
                                        </span>
                                        <span className="absolute top-4 right-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-950">
                                            Published
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            {event.department?.name || 'University community'}
                                        </p>
                                        <h3 className="mt-2 text-lg font-semibold group-hover:text-blue-800">{event.title}</h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{event.short_description}</p>
                                        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                            <span className="inline-flex items-center gap-1">
                                                <CalendarDays className="size-3.5" />
                                                {event.start_at
                                                    ? new Date(event.start_at).toLocaleDateString('en-GB', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : 'Date TBA'}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <Clock3 className="size-3.5" />
                                                {event.start_at
                                                    ? new Date(event.start_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                                                    : 'Time TBA'}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="size-3.5" />
                                                {event.venue?.name || 'Main campus'}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-xs">
                                            <span className="font-medium text-slate-500">Open for registration</span>
                                            <span className="inline-flex items-center gap-1 font-semibold text-blue-800">
                                                View details <ArrowUpRight className="size-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Featured</p>
                                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Highlighted by the university</h2>
                                    <p className="mt-3 text-slate-500">Flagship events selected by the Office of Student Affairs.</p>
                                </div>
                                <Link href={route('events.index')} className="hidden items-center gap-1 text-sm font-semibold text-blue-900 sm:flex">
                                    All events <ArrowUpRight className="size-4" />
                                </Link>
                            </div>
                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                {(events.slice(0, 3).length
                                    ? events.slice(0, 3)
                                    : [
                                          {
                                              title: 'AI & Machine Learning Workshop',
                                              short_description: 'Hands-on learning with modern tools and techniques.',
                                              category: { name: 'Workshop' },
                                          },
                                          {
                                              title: 'Inter University Programming Contest',
                                              short_description: 'A fast-paced challenge for competitive programmers.',
                                              category: { name: 'Competition' },
                                          },
                                          {
                                              title: 'Career Development Seminar',
                                              short_description: 'Practical guidance for your next professional step.',
                                              category: { name: 'Career' },
                                          },
                                      ]
                                ).map((event: any, index: number) => (
                                    <Link
                                        key={event.id || index}
                                        href={event.slug ? route('events.show', event.slug) : route('events.index')}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={
                                                    event.banner
                                                        ? `/storage/${event.banner}`
                                                        : [
                                                              heroImage,
                                                              featureImage,
                                                              'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
                                                          ][index % 3]
                                                }
                                                alt={event.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-900">
                                                {event.category?.name || 'Campus event'}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                {event.department?.name || 'University community'}
                                            </p>
                                            <h3 className="mt-2 text-lg font-semibold group-hover:text-blue-800">{event.title}</h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{event.short_description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Categories</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Find events by category</h2>
                            </div>
                            <Link href={route('events.index')} className="hidden text-sm font-semibold text-blue-900 sm:block">
                                Browse everything
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.slice(0, 9).map((category: any) => (
                                <Link
                                    key={category.id}
                                    href={`${route('events.index')}?category_id=${category.id}`}
                                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
                                >
                                    <span>
                                        <span className="block font-semibold">{category.name}</span>
                                        <span className="mt-1 block text-sm text-slate-500">
                                            {categoryDescriptions[category.name] || 'University programmes and activities'}
                                        </span>
                                    </span>
                                    <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-emerald-600" />
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">How it works</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">The full event lifecycle</h2>
                            </div>
                            <div className="mt-12 grid gap-8 md:grid-cols-4">
                                {[
                                    { title: 'Coordinators propose', text: 'Submit a complete event proposal with schedule, venue and capacity.' },
                                    { title: 'Faculty approve', text: 'Review, request changes or approve events before they go live.' },
                                    { title: 'Students attend', text: 'Register, receive a QR ticket and check in at the venue.' },
                                    { title: 'Certificates & insight', text: 'Issue verified certificates and turn feedback into better events.' },
                                ].map((step, index) => (
                                    <div key={step.title} className="border-t-2 border-emerald-300 pt-5">
                                        <p className="text-xs font-semibold tracking-[.16em] text-emerald-700 uppercase">Step {index + 1}</p>
                                        <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8 lg:py-24">
                            <div>
                                <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Built for momentum</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    Everything your campus needs to move forward.
                                </h2>
                                <p className="mt-5 max-w-md leading-7 text-slate-500">
                                    From the first event idea to the final certificate, EDU EVENTS keeps every handoff visible and every student
                                    experience human.
                                </p>
                            </div>
                            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                                {features.map(({ icon: Icon, title, text }) => (
                                    <div key={title} className="group">
                                        <Icon className="size-6 text-blue-800 transition group-hover:text-emerald-600" />
                                        <h3 className="mt-4 font-semibold">{title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
                        <div className="relative overflow-hidden rounded-3xl">
                            <img src={featureImage} alt="University students working together" className="h-[430px] w-full object-cover" />
                            <div className="absolute bottom-5 left-5 rounded-2xl bg-slate-950/85 p-5 text-white backdrop-blur">
                                <p className="text-xs font-semibold tracking-[.16em] text-emerald-300 uppercase">For every learner</p>
                                <p className="mt-2 text-lg font-medium">Find your people. Find your next challenge.</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold tracking-[.18em] text-emerald-700 uppercase">Connect. Participate. Achieve.</p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Participation should feel like belonging.</h2>
                            <p className="mt-5 leading-7 text-slate-500">
                                Whether it’s a coding contest in the lab, a seminar in the auditorium or a cultural evening under campus lights, your
                                next meaningful moment starts here.
                            </p>
                            <div className="mt-8 space-y-4">
                                {[
                                    'One place to discover what matters to you',
                                    'A clear digital pass for every registration',
                                    'Recognition that stays with your journey',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle2 className="size-5 text-emerald-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-slate-200 bg-white">
                        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-sm font-semibold tracking-[.18em] text-blue-700 uppercase">Gallery</p>
                                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Recent moments</h2>
                                </div>
                                <Link href={route('gallery.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
                                    Open gallery <ArrowRight className="size-4" />
                                </Link>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
                                {(gallery.length
                                    ? gallery.slice(0, 8).map((item: any) => ({ url: item.url, caption: item.caption || 'Campus event' }))
                                    : galleryFallback.map((url, index) => ({
                                          url,
                                          caption: ['Workshop session', 'Students collaborating', 'Campus programme', 'Event day'][index % 4],
                                      }))
                                ).map((item: any, index: number) => (
                                    <figure key={`${item.url}-${index}`} className="group overflow-hidden rounded-2xl">
                                        <img
                                            src={item.url}
                                            alt={item.caption}
                                            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 md:h-56"
                                        />
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#f7f9fc]">
                        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
                            <p className="text-sm font-semibold tracking-[.18em] text-blue-700 uppercase">Testimonials</p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Trusted across campus</h2>
                            <div className="mt-10 grid gap-5 lg:grid-cols-3">
                                {testimonials.map((testimonial) => (
                                    <article key={testimonial.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <Quote className="size-5 text-blue-600" />
                                        <p className="mt-6 min-h-24 text-sm leading-6 text-slate-700">{testimonial.quote}</p>
                                        <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                                            <span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                                                {testimonial.initials}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold">{testimonial.name}</p>
                                                <p className="text-xs text-slate-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="mt-7 flex items-center gap-1 text-amber-500">
                                <Star className="size-5 fill-current" />
                                <Star className="size-5 fill-current" />
                                <Star className="size-5 fill-current" />
                                <Star className="size-5 fill-current" />
                                <Star className="size-5 fill-current" />
                                <span className="ml-2 text-sm text-slate-500">Average rating 4.7 / 5 from 1,243 feedback submissions this year</span>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
                        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 px-6 py-10 shadow-sm sm:flex-row sm:items-center sm:px-10">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to join the next event?</h2>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                                    Create your student account, register in seconds and keep every certificate in one verified profile.
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-3">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    <Users className="size-4" />
                                    Create account
                                </Link>
                                <Link
                                    href={route('events.index')}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                >
                                    <CalendarDays className="size-4" />
                                    Browse events
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
                <PublicFooter />
            </div>
        </>
    );
}
