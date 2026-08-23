import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ users, roles }: any) {
    const { data, setData, post, processing } = useForm({ name: '', email: '', password: '', role: 'Student' });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post(route('university.users.store'), { onSuccess: () => setData({ name: '', email: '', password: '', role: 'Student' }) });
    }

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="mx-auto max-w-5xl p-4">
                <h1 className="mb-4 text-2xl font-semibold">Users</h1>
                <form onSubmit={submit} className="mb-6 grid gap-3 md:grid-cols-5">
                    <input value={data.name} onChange={(event) => setData('name', event.target.value)} placeholder="Name" className="rounded border px-3 py-2" required />
                    <input value={data.email} onChange={(event) => setData('email', event.target.value)} type="email" placeholder="Email" className="rounded border px-3 py-2" required />
                    <input value={data.password} onChange={(event) => setData('password', event.target.value)} type="password" placeholder="Password" className="rounded border px-3 py-2" required />
                    <select value={data.role} onChange={(event) => setData('role', event.target.value)} className="rounded border px-3 py-2">
                        {roles.map((role: string) => <option key={role}>{role}</option>)}
                    </select>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Add user</button>
                </form>
                <ul className="space-y-2">
                    {users.data?.map((user: any) => (
                        <li key={user.id} className="flex items-center justify-between rounded border p-3">
                            <span><strong>{user.name}</strong> <small className="text-gray-500">{user.email} · {user.roles?.map((role: any) => role.name).join(', ')}</small></span>
                            <button type="button" onClick={() => router.delete(route('university.users.destroy', user.id))} className="text-red-600">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
