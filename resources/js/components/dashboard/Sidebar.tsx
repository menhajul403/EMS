import BrandLogo from '@/components/brand-logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, Building2, CalendarDays, ChevronsUpDown, ClipboardCheck, FolderKanban, LayoutGrid, MessageSquare, QrCode, Settings, Users } from 'lucide-react';

export default function Sidebar() {
    const { auth, url } = usePage().props as any;
    const roles: string[] = auth?.user?.roles ?? [];
    const items = [
        { label: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
        { label: 'Discover Events', href: route('events.index'), icon: CalendarDays },
        { label: 'Notifications', href: route('notifications.index'), icon: MessageSquare },
        ...(roles.includes('Student')
            ? [
                  { label: 'My Events', href: route('student.registrations.index'), icon: FolderKanban },
                  { label: 'Feedback', href: route('student.feedback.index'), icon: MessageSquare },
              ]
            : []),
        ...(roles.includes('Coordinator')
            ? [
                  { label: 'Manage Events', href: route('coordinator.events.index'), icon: FolderKanban },
                  { label: 'Attendance', href: route('coordinator.attendance.scan'), icon: QrCode },
                  { label: 'Reports', href: route('reports.index'), icon: BarChart3 },
              ]
            : []),
        ...(roles.includes('Faculty') ? [{ label: 'Approvals', href: route('faculty.events.index'), icon: ClipboardCheck }] : []),
        ...(roles.includes('University Admin')
            ? [
                  { label: 'Users', href: route('university.users.index'), icon: Users },
                                    { label: 'Departments', href: route('university.departments.index'), icon: Building2 },
                                    { label: 'Clubs', href: route('university.clubs.index'), icon: Building2 },
                                    { label: 'Categories', href: route('university.categories.index'), icon: FolderKanban },
                                    { label: 'Venues', href: route('university.venues.index'), icon: Building2 },
                  { label: 'Reports', href: route('reports.index'), icon: BarChart3 },
              ]
            : []),
                ...(roles.includes('Super Admin')
                        ? [
                                    { label: 'Universities', href: route('super-admin.universities.index'), icon: Building2 },
                                    { label: 'Reports', href: route('reports.index'), icon: BarChart3 },
                                      { label: 'Settings', href: route('profile.edit'), icon: Settings },
                            ]
                        : []),
    ];

    return (
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950 text-slate-300 lg:block">
            <div className="sticky top-0 flex h-screen flex-col p-5">
                <div className="border-b border-slate-800 px-2 pb-6">
                    <BrandLogo dark />
                    <p className="mt-2 text-xs text-slate-500">Academic event management</p>
                </div>
                <nav className="mt-8 flex flex-1 flex-col gap-1">
                    <p className="mb-3 px-3 text-[10px] font-semibold tracking-[.18em] text-slate-500 uppercase">Workspace</p>
                    {items.map(({ label, href, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${url === new URL(href).pathname ? 'bg-emerald-400 font-semibold text-slate-950' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Link>
                    ))}
                </nav>
                {auth?.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-800 px-3 py-3 text-left transition hover:bg-slate-800 hover:text-white">
                                <UserInfo user={auth.user} />
                                <ChevronsUpDown className="ml-auto size-4 shrink-0 text-slate-500" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 rounded-lg" align="end" side="top">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </aside>
    );
}
