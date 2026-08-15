import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ venues }: any) {
    const { data, setData, post, processing } = useForm({ name: '', address: '', capacity: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('university.venues.store'), { onSuccess: () => setData({ name: '', address: '', capacity: '' }) });
    }

    return (
        <AppLayout>
            <Head title="Venues" />
            <div className="mx-auto max-w-3xl p-4">
                <h1 className="mb-4 text-2xl font-semibold">Venues</h1>
                <form onSubmit={submit} className="mb-6 grid gap-3 md:grid-cols-4">
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" className="rounded border px-3 py-2" />
                    <input value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="Address" className="rounded border px-3 py-2" />
                    <input value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} placeholder="Capacity" className="rounded border px-3 py-2" />
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Add</button>
                </form>
                <ul className="space-y-2">
                    {venues.data?.map((v: any) => (
                        <li key={v.id} className="flex justify-between rounded border p-3">
                            <span>{v.name} — {v.address}</span>
                            <button type="button" onClick={() => router.delete(route('university.venues.destroy', v.id))} className="text-red-600">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
