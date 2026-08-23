import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, stats, recentEvents, roles, studentStats, coordinatorStats, facultyStats, adminStats } = usePage().props as any;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <h3 className="text-lg font-medium">Welcome{auth?.user ? `, ${auth.user.name}` : ''}</h3>
                    <p className="text-sm text-muted-foreground">One platform for every university event.</p>
                    {roles?.length > 0 && <p className="mt-1 text-xs text-gray-500">Roles: {roles.join(', ')}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border bg-white p-4 dark:bg-slate-900">
                        <div className="text-sm text-gray-500">Upcoming Events</div>
                        <div className="text-2xl font-semibold">{stats?.upcoming_events ?? 0}</div>
                    </div>
                    <div className="rounded-xl border bg-white p-4 dark:bg-slate-900">
                        <div className="text-sm text-gray-500">My Registrations</div>
                        <div className="text-2xl font-semibold">{stats?.my_registrations ?? 0}</div>
                    </div>
                    <div className="rounded-xl border bg-white p-4 dark:bg-slate-900">
                        <div className="text-sm text-gray-500">Attended Events</div>
                        <div className="text-2xl font-semibold">{stats?.attended_events ?? 0}</div>
                    </div>
                </div>

                {studentStats && (
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border p-4">
                            <div className="text-sm text-gray-500">Certificates Earned</div>
                            <div className="text-2xl font-semibold">{studentStats.certificates}</div>
                        </div>
                        <div className="rounded-xl border p-4">
                            <div className="text-sm text-gray-500">Pending Feedback</div>
                            <div className="text-2xl font-semibold">{studentStats.pending_feedback}</div>
                        </div>
                    </div>
                )}

                {coordinatorStats && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">My Events</div><div className="text-2xl font-semibold">{coordinatorStats.total_events}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Published</div><div className="text-2xl font-semibold">{coordinatorStats.published_events}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Pending Approval</div><div className="text-2xl font-semibold">{coordinatorStats.pending_events}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Registrations</div><div className="text-2xl font-semibold">{coordinatorStats.registrations}</div></div>
                    </div>
                )}

                {facultyStats && (
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Pending Approvals</div><div className="text-2xl font-semibold">{facultyStats.pending_approvals}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Department Events</div><div className="text-2xl font-semibold">{facultyStats.department_events}</div></div>
                    </div>
                )}

                {adminStats && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Users</div><div className="text-2xl font-semibold">{adminStats.users}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Students</div><div className="text-2xl font-semibold">{adminStats.students}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Events</div><div className="text-2xl font-semibold">{adminStats.events}</div></div>
                        <div className="rounded-xl border p-4"><div className="text-sm text-gray-500">Registrations</div><div className="text-2xl font-semibold">{adminStats.registrations}</div></div>
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <h4 className="mb-3 font-medium">Recent Published Events</h4>
                        <ul className="space-y-2 text-sm">
                            {recentEvents?.length ? recentEvents.map((event: any) => (
                                <li key={event.id} className="flex justify-between gap-3">
                                    <span>{event.title}</span>
                                    <Link href={route('events.show', event.slug)} className="text-blue-600">View</Link>
                                </li>
                            )) : <li className="text-gray-500">No published events yet.</li>}
                        </ul>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h4 className="mb-3 font-medium">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href={route('events.index')} className="text-blue-600">Browse events</Link></li>
                            {roles?.includes('Student') && (
                                <>
                                    <li><Link href={route('student.registrations.index')} className="text-blue-600">My registrations</Link></li>
                                    <li><Link href={route('student.feedback.index')} className="text-blue-600">Feedback</Link></li>
                                </>
                            )}
                            {roles?.includes('Coordinator') && (
                                <>
                                    <li><Link href={route('coordinator.events.index')} className="text-blue-600">Manage events</Link></li>
                                    <li><Link href={route('coordinator.attendance.scan')} className="text-blue-600">Scan attendance</Link></li>
                                </>
                            )}
                            {roles?.includes('Faculty') && (
                                <li><Link href={route('faculty.events.index')} className="text-blue-600">Pending approvals</Link></li>
                            )}
                            {roles?.includes('University Admin') && (
                                <>
                                    <li><Link href={route('university.users.index')} className="text-blue-600">Users</Link></li>
                                    <li><Link href={route('university.categories.index')} className="text-blue-600">Categories</Link></li>
                                    <li><Link href={route('university.clubs.index')} className="text-blue-600">Clubs</Link></li>
                                    <li><Link href={route('university.venues.index')} className="text-blue-600">Venues</Link></li>
                                    <li><Link href={route('reports.index')} className="text-blue-600">Reports</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
