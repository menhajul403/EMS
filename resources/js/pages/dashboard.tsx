import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="col-span-2 space-y-4">
                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            <h3 className="text-lg font-medium">Welcome{auth?.user ? `, ${auth.user.name}` : ''}</h3>
                            <p className="text-sm text-muted-foreground">Overview of your university events and registrations.</p>
                        </div>

                        <div className="rounded-xl border p-4">
                            <PlaceholderPattern className="h-48 w-full" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            <h4 className="text-sm font-medium">Upcoming Events</h4>
                            <div className="mt-2 text-sm text-muted-foreground">You have 1 upcoming event.</div>
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm">
                            <h4 className="text-sm font-medium">Quick Links</h4>
                            <ul className="mt-2 flex flex-col gap-2 text-sm">
                                <li>Manage events</li>
                                <li>View registrations</li>
                                <li>Generate certificates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
