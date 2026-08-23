import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ summary }: any) {
    return (
        <AppLayout>
            <Head title="Reports" />
            <div className="mx-auto max-w-5xl p-4">
                <h1 className="mb-6 text-2xl font-semibold">Reports & Analytics</h1>

                <div className="mb-6 grid gap-4 md:grid-cols-5">
                    {Object.entries(summary).map(([key, value]) => (
                        <div key={key} className="rounded border p-4">
                            <div className="text-sm capitalize text-gray-500">{key}</div>
                            <div className="text-2xl font-semibold">{value as number}</div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link href={route('reports.events')} className="rounded border p-6 hover:bg-gray-50">
                        <h2 className="font-medium">Event Report</h2>
                        <p className="mt-1 text-sm text-gray-500">Filter events by status, category, and date range.</p>
                    </Link>
                    <Link href={route('reports.registrations')} className="rounded border p-6 hover:bg-gray-50">
                        <h2 className="font-medium">Registration Report</h2>
                        <p className="mt-1 text-sm text-gray-500">View registrations by event and status.</p>
                    </Link>
                    <a href={route('reports.events.export')} className="rounded border p-6 hover:bg-gray-50">
                        <h2 className="font-medium">Export Events (CSV)</h2>
                        <p className="mt-1 text-sm text-gray-500">Download event data for external analysis.</p>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
