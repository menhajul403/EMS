import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ departments, universities }: any) {
    const { data, setData, post, processing } = useForm({ name: '', code: '', university_id: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('university.departments.store'), { onSuccess: () => setData({ name: '', code: '', university_id: '' }) });
    }

    return (
        <AppLayout>
            <Head title="Departments" />
            <div className="mx-auto max-w-3xl p-4">
                <h1 className="mb-4 text-2xl font-semibold">Departments</h1>
                <form onSubmit={submit} className="mb-6 grid gap-3 md:grid-cols-4">
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" className="rounded border px-3 py-2" />
                    <input value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Code" className="rounded border px-3 py-2" />
                    <select value={data.university_id} onChange={(e) => setData('university_id', e.target.value)} className="rounded border px-3 py-2">
                        <option value="">University</option>
                        {universities.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Add</button>
                </form>
                <ul className="space-y-2">
                    {departments.data?.map((d: any) => (
                        <li key={d.id} className="flex justify-between rounded border p-3">
                            <span>{d.name} ({d.code})</span>
                            <button type="button" onClick={() => router.delete(route('university.departments.destroy', d.id))} className="text-red-600">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
