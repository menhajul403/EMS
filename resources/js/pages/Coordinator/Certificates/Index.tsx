import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ event, registrations }: any) {
    return (
        <AppLayout>
            <Head title={`Certificates — ${event.title}`} />
            <div className="mx-auto max-w-4xl p-4">
                <Link href={route('coordinator.events.index')} className="text-sm text-blue-600">Back to events</Link>
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Certificates: {event.title}</h1>
                    <button
                        type="button"
                        onClick={() => router.post(route('coordinator.events.certificates.generate-all', event.id))}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Bulk Generate
                    </button>
                </div>

                <ul className="mt-6 space-y-3">
                    {registrations.data?.map((r: any) => (
                        <li key={r.id} className="flex items-center justify-between rounded border p-4">
                            <div>
                                <div className="font-medium">{r.user?.name}</div>
                                <div className="text-sm text-gray-500">{r.certificate ? `Issued: ${r.certificate.certificate_number}` : 'Not generated'}</div>
                            </div>
                            {!r.certificate && (
                                <Link href={route('certificates.generate', r.id)} className="text-blue-600">Generate</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
