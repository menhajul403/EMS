import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';
import { Head } from '@inertiajs/react';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div className="public-page min-h-screen bg-background text-foreground">
                <PublicHeader active="contact" />

                <main className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
                    <div className="border-b border-slate-300 pb-8">
                        <div className="text-[11px] font-semibold tracking-[0.18em] text-blue-700 uppercase">CONTACT</div>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">Talk to the event office</h1>
                        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
                            Event proposals, registration problems, certificate reissues and venue bookings — send us the details and we will follow up.
                        </p>
                    </div>

                    <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-[20px] border border-slate-300 bg-[#edf4fb] p-5 shadow-sm md:p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                                    <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                                    <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                                    <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                                    <textarea rows={5} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200" />
                                </div>

                                <button className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-blue-900 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                                    Send message
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 rounded-[18px] border border-slate-300 bg-[#f3f7fb] p-4 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-700">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Email</div>
                                    <div className="mt-1 text-sm font-medium text-slate-800">events@campusconnect.edu</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-[18px] border border-slate-300 bg-[#f3f7fb] p-4 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-700">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Phone</div>
                                    <div className="mt-1 text-sm font-medium text-slate-800">+880 1711 000101</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-[18px] border border-slate-300 bg-[#f3f7fb] p-4 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-700">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Office</div>
                                    <div className="mt-1 text-sm font-medium text-slate-800">Academic Building 1, Room 108</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-[18px] border border-slate-300 bg-[#f3f7fb] p-4 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-700">
                                    <Clock3 className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Hours</div>
                                    <div className="mt-1 text-sm font-medium text-slate-800">Sun-Thu, 9:00 AM - 5:00 PM</div>
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
