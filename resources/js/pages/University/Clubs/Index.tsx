import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ clubs }: any) {
    const { data, setData, post, processing } = useForm({ name: '', slug: '', description: '', status: 'active' });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post(route('university.clubs.store'), { onSuccess: () => setData({ name: '', slug: '', description: '', status: 'active' }) });
    }

    return (
        <AppLayout>
            <Head title="Clubs" />
            <div className="mx-auto max-w-4xl p-4">
                <h1 className="mb-4 text-2xl font-semibold">Clubs</h1>
                <form onSubmit={submit} className="mb-6 grid gap-3 md:grid-cols-4">
                    <input value={data.name} onChange={(event) => setData('name', event.target.value)} placeholder="Name" className="rounded border px-3 py-2" required />
                    <input value={data.slug} onChange={(event) => setData('slug', event.target.value)} placeholder="Slug" className="rounded border px-3 py-2" />
                    <input value={data.description} onChange={(event) => setData('description', event.target.value)} placeholder="Description" className="rounded border px-3 py-2" />
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Add club</button>
                </form>
                <ul className="space-y-2">
                    {clubs.data?.map((club: any) => (
                        <li key={club.id} className="flex items-center justify-between rounded border p-3">
                            <span><strong>{club.name}</strong> <small className="text-gray-500">({club.status})</small></span>
                            <button type="button" onClick={() => router.delete(route('university.clubs.destroy', club.id))} className="text-red-600">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
