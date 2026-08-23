import BrandLogo from '@/components/brand-logo';
import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    return (
        <footer className="bg-[#071b35] text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
                <div>
                    <BrandLogo href={route('home')} dark />
                    <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
                        EDU EVENTS is the academic event management system for proposals, registration, attendance and certificates.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-white">Platform</h3>
                    <div className="mt-4 space-y-3 text-sm">
                        <Link className="block hover:text-white" href={route('events.index')}>
                            Browse events
                        </Link>
                        <Link className="block hover:text-white" href={route('gallery.index')}>
                            Gallery
                        </Link>
                        <Link className="block hover:text-white" href={route('register')}>
                            Create an account
                        </Link>
                        <Link className="block hover:text-white" href={route('login')}>
                            Log in
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-white">University</h3>
                    <div className="mt-4 space-y-3 text-sm">
                        <Link className="block hover:text-white" href={route('about')}>
                            About EDU EVENTS
                        </Link>
                        <Link className="block hover:text-white" href={route('contact')}>
                            Contact office
                        </Link>
                        <span className="block text-slate-400">Office of Student Affairs</span>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-white">Contact</h3>
                    <div className="mt-4 space-y-3 text-sm text-slate-400">
                        <a className="block hover:text-white" href="mailto:events@campusconnect.edu">
                            events@campusconnect.edu
                        </a>
                        <a className="block hover:text-white" href="tel:+8801711000101">
                            +880 1711 000101
                        </a>
                        <span className="block">Academic Building 1, Room 108</span>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-slate-500 lg:px-8">
                    © 2026 EDU EVENTS - Academic Event Management System.
                </div>
            </div>
        </footer>
    );
}
