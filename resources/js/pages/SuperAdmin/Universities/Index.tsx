import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ universities }: any) {
    return (
        <AppLayout>
            <Head title="Universities" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Universities</h1>
                    <Link href={route('super-admin.universities.create')} className="rounded bg-blue-600 px-4 py-2 text-white">
                        Add University
                    </Link>
                </div>
                <ul className="space-y-3">
                    {universities.data?.map((university: any) => (
                        <li key={university.id} className="flex items-center justify-between rounded border p-4">
                            <div>
                                <div className="font-medium">{university.name}</div>
                                <div className="text-sm text-gray-500">{university.city}, {university.country}</div>
                            </div>
                            <Link href={route('super-admin.universities.edit', university.id)} className="text-blue-600">
                                Edit
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
