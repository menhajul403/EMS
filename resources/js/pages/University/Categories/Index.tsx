import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ categories }: any) {
    const { data, setData, post, processing } = useForm({ name: '', slug: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('university.categories.store'), { onSuccess: () => setData({ name: '', slug: '' }) });
    }

    return (
        <AppLayout>
            <Head title="Event Categories" />
            <div className="mx-auto max-w-3xl p-4">
                <h1 className="mb-4 text-2xl font-semibold">Event Categories</h1>
                <form onSubmit={submit} className="mb-6 flex gap-3">
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" className="rounded border px-3 py-2" />
                    <input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug" className="rounded border px-3 py-2" />
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Add</button>
                </form>
                <ul className="space-y-2">
                    {categories.data?.map((c: any) => (
                        <li key={c.id} className="flex justify-between rounded border p-3">
                            <span>{c.name}</span>
                            <button type="button" onClick={() => router.delete(route('university.categories.destroy', c.id))} className="text-red-600">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
