import { Link, usePage } from '@inertiajs/react';
import { BarChart3, CalendarDays, ClipboardCheck, FolderKanban, LayoutGrid, MessageSquare, QrCode, Users } from 'lucide-react';

export default function Sidebar() {
    const { auth, url } = usePage().props as any;
    const roles: string[] = auth?.user?.roles ?? [];
    const items = [
        { label: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
        { label: 'Discover Events', href: route('events.index'), icon: CalendarDays },
        { label: 'Notifications', href: route('notifications.index'), icon: MessageSquare },
        ...(roles.includes('Student') ? [{ label: 'My Events', href: route('student.registrations.index'), icon: FolderKanban }, { label: 'Feedback', href: route('student.feedback.index'), icon: MessageSquare }] : []),
        ...(roles.includes('Coordinator') ? [{ label: 'Manage Events', href: route('coordinator.events.index'), icon: FolderKanban }, { label: 'Attendance', href: route('coordinator.attendance.scan'), icon: QrCode }, { label: 'Reports', href: route('reports.index'), icon: BarChart3 }] : []),
        ...(roles.includes('Faculty') ? [{ label: 'Approvals', href: route('faculty.events.index'), icon: ClipboardCheck }] : []),
        ...(roles.includes('University Admin') ? [{ label: 'Users', href: route('university.users.index'), icon: Users }, { label: 'Reports', href: route('reports.index'), icon: BarChart3 }] : []),
    ];

    return (
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950 text-slate-300 lg:block">
            <div className="sticky top-0 flex h-screen flex-col p-5">
                <div className="flex items-center gap-3 border-b border-slate-800 px-2 pb-6"><span className="flex size-9 items-center justify-center rounded-xl bg-emerald-400 font-bold text-slate-950">C</span><div><h3 className="font-semibold text-white">CampusConnect</h3><p className="text-xs text-slate-500">University portal</p></div></div>
                <nav className="mt-8 flex flex-1 flex-col gap-1">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Workspace</p>
                    {items.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${url === new URL(href).pathname ? 'bg-emerald-400 font-semibold text-slate-950' : 'hover:bg-slate-800 hover:text-white'}`}><Icon className="size-4" />{label}</Link>)}
                </nav>
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs text-slate-400"><p className="font-medium text-slate-200">Connect. Participate. Achieve.</p><p className="mt-1">Your campus, moving together.</p></div>
            </div>
        </aside>
    );
}
