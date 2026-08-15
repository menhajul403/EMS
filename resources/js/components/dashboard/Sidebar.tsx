import { Link } from '@inertiajs/react';

export default function Sidebar() {
    const linkClass = 'block py-2 px-3 rounded hover:bg-muted/50';

    return (
        <aside className="w-64 border-r border-gray-100 bg-white dark:bg-slate-900">
            <div className="p-4">
                <h3 className="mb-4 text-sm font-semibold">CampusConnect</h3>
                <nav className="flex flex-col gap-1">
                    <Link href={route('dashboard')} className={linkClass}>
                        Dashboard
                    </Link>
                    <Link href={route('events.index')} className={linkClass}>
                        Events
                    </Link>
                    <Link href={route('event_registrations.index')} className={linkClass}>
                        Registrations
                    </Link>
                    <Link href={route('certificates.index')} className={linkClass}>
                        Certificates
                    </Link>
                    <Link href={route('users.index')} className={linkClass}>
                        Users
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
