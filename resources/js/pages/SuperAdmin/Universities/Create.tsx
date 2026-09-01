import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        short_name: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        country: '',
        timezone: 'Asia/Dhaka',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('super-admin.universities.store'));
    }

    const fieldClass = 'mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none';

    return (
        <AppLayout>
            <Head title="Create University" />
            <div className="mx-auto max-w-2xl p-4">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Create University</h1>
                    <Link href={route('super-admin.universities.index')} className="text-sm font-medium text-blue-600 hover:underline">
                        Back to list
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">University name</label>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className={fieldClass} />
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Short name</label>
                            <input value={data.short_name} onChange={(e) => setData('short_name', e.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Country</label>
                            <input value={data.country} onChange={(e) => setData('country', e.target.value)} className={fieldClass} />
                            {errors.country && <div className="mt-1 text-sm text-red-600">{errors.country}</div>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">City</label>
                            <input value={data.city} onChange={(e) => setData('city', e.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Timezone</label>
                            <input value={data.timezone} onChange={(e) => setData('timezone', e.target.value)} className={fieldClass} />
                            {errors.timezone && <div className="mt-1 text-sm text-red-600">{errors.timezone}</div>}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={fieldClass} />
                            {errors.email && <div className="mt-1 text-sm text-red-600">{errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Phone</label>
                            <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={fieldClass} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Website</label>
                        <input type="url" value={data.website} onChange={(e) => setData('website', e.target.value)} className={fieldClass} />
                        {errors.website && <div className="mt-1 text-sm text-red-600">{errors.website}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Address</label>
                        <textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={3} className={fieldClass} />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60">
                            {processing ? 'Saving...' : 'Save University'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
