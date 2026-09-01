import BrandLogo from '@/components/brand-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';

export default function Topbar() {
    const { auth, unreadNotifications = 0 } = usePage().props as any;
    const user = auth?.user;
    const roles: string[] = user?.roles ?? [];
    const mobileLinks = [
        { label: 'Events', href: route('events.index') },
        ...(roles.includes('Student')
            ? [
                  { label: 'My Events', href: route('student.registrations.index') },
                  { label: 'Feedback', href: route('student.feedback.index') },
              ]
            : []),
        ...(roles.includes('Coordinator')
            ? [
                  { label: 'Manage', href: route('coordinator.events.index') },
                  { label: 'Attendance', href: route('coordinator.attendance.scan') },
              ]
            : []),
        ...(roles.includes('Faculty') ? [{ label: 'Approvals', href: route('faculty.events.index') }] : []),
        ...(roles.includes('University Admin') ? [{ label: 'Users', href: route('university.users.index') }, { label: 'Reports', href: route('reports.index') }] : []),
        ...(roles.includes('Super Admin') ? [{ label: 'Universities', href: route('super-admin.universities.index') }, { label: 'Reports', href: route('reports.index') }] : []),
    ];

    return (
        <div className="flex flex-wrap items-center justify-between border-b border-border bg-background px-5 py-4">
            <div className="flex items-center gap-4">
                <BrandLogo compact />
                <div>
                    <p className="text-xs font-semibold tracking-[.16em] text-primary uppercase">EDU EVENTS portal</p>
                    <h2 className="mt-1 text-lg font-semibold">Good to see you, {user?.name?.split(' ')[0] ?? 'there'}</h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <AppearanceToggleDropdown />
                <Link href={route('notifications.index')} className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-accent-foreground" aria-label="Notifications">
                    <Bell className="size-5" />
                    {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{unreadNotifications > 9 ? '9+' : unreadNotifications}</span>}
                </Link>
                {user && (
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-muted-foreground text-xs">{user.email}</span>
                        </div>
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700"
                            aria-label={`${user.name} avatar`}
                        >
                            {user.name
                                .split(' ')
                                .map((part: string) => part[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
            <nav className="-mx-5 basis-full gap-2 overflow-x-auto border-t border-border px-5 py-2 lg:hidden">
                {mobileLinks.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
