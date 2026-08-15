import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage().props as any;
    const roles: string[] = auth?.user?.roles ?? [];
    const linkClass = 'block rounded px-3 py-2 hover:bg-muted/50';

    return (
        <aside className="w-64 border-r border-gray-100 bg-white dark:bg-slate-900">
            <div className="p-4">
                <h3 className="mb-4 text-sm font-semibold">CampusConnect</h3>
                <nav className="flex flex-col gap-1">
                    <Link href={route('dashboard')} className={linkClass}>Dashboard</Link>
                    <Link href={route('events.index')} className={linkClass}>Browse Events</Link>
                    <Link href={route('notifications.index')} className={linkClass}>Notifications</Link>

                    {roles.includes('Student') && (
                        <>
                            <Link href={route('student.registrations.index')} className={linkClass}>My Registrations</Link>
                            <Link href={route('student.feedback.index')} className={linkClass}>Feedback</Link>
                        </>
                    )}

                    {roles.includes('Coordinator') && (
                        <>
                            <Link href={route('coordinator.events.index')} className={linkClass}>Manage Events</Link>
                            <Link href={route('coordinator.attendance.scan')} className={linkClass}>Scan Attendance</Link>
                        </>
                    )}

                    {roles.includes('Faculty') && (
                        <Link href={route('faculty.events.index')} className={linkClass}>Approvals</Link>
                    )}

                    {roles.includes('University Admin') && (
                        <>
                            <Link href={route('university.categories.index')} className={linkClass}>Categories</Link>
                            <Link href={route('university.venues.index')} className={linkClass}>Venues</Link>
                            <Link href={route('university.departments.index')} className={linkClass}>Departments</Link>
                            <Link href={route('reports.index')} className={linkClass}>Reports</Link>
                        </>
                    )}

                    {roles.includes('Super Admin') && (
                        <Link href={route('super-admin.universities.index')} className={linkClass}>Universities</Link>
                    )}
                </nav>
            </div>
        </aside>
    );
}
