import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ event, categories, venues, departments, facultyAdvisors, clubs }: any) {
    const formatDate = (d: string | null) => d ? new Date(d).toISOString().slice(0, 16) : '';

    const { data, setData, put, processing, errors } = useForm({
        title: event.title || '',
        slug: event.slug || '',
        short_description: event.short_description || '',
        description: event.description || '',
        category_id: event.category_id || '',
        venue_id: event.venue_id || '',
        department_id: event.department_id || '',
        faculty_advisor_id: event.faculty_advisor_id || '',
        club_id: event.club_id || '',
        start_at: formatDate(event.start_at),
        end_at: formatDate(event.end_at),
        registration_deadline: formatDate(event.registration_deadline),
        capacity: event.capacity || '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('coordinator.events.update', event.id));
    }

    const fieldClass = 'mt-1 w-full rounded border px-3 py-2';

    return (
        <AppLayout>
            <Head title="Edit Event" />
            <div className="mx-auto max-w-2xl p-4">
                <h1 className="mb-4 text-xl font-semibold">Edit Event</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input value={data.title} onChange={(e) => setData('title', e.target.value)} className={fieldClass} />
                        {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Slug</label>
                        <input value={data.slug} onChange={(e) => setData('slug', e.target.value)} className={fieldClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Short Description</label>
                        <textarea value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} className={fieldClass} rows={2} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className={fieldClass} rows={4} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">Category</label>
                            <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={fieldClass}>
                                <option value="">Choose</option>
                                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Venue</label>
                            <select value={data.venue_id} onChange={(e) => setData('venue_id', e.target.value)} className={fieldClass}>
                                <option value="">Choose</option>
                                {venues.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Department</label>
                            <select value={data.department_id} onChange={(e) => setData('department_id', e.target.value)} className={fieldClass}>
                                <option value="">Choose</option>
                                {departments.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Club</label>
                            <select value={data.club_id} onChange={(e) => setData('club_id', e.target.value)} className={fieldClass}>
                                <option value="">Choose</option>
                                {clubs?.map((club: any) => <option key={club.id} value={club.id}>{club.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Faculty Advisor</label>
                            <select value={data.faculty_advisor_id} onChange={(e) => setData('faculty_advisor_id', e.target.value)} className={fieldClass}>
                                <option value="">Choose</option>
                                {facultyAdvisors.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">Start</label>
                            <input type="datetime-local" value={data.start_at} onChange={(e) => setData('start_at', e.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">End</label>
                            <input type="datetime-local" value={data.end_at} onChange={(e) => setData('end_at', e.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Registration Deadline</label>
                            <input type="datetime-local" value={data.registration_deadline} onChange={(e) => setData('registration_deadline', e.target.value)} className={fieldClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Capacity</label>
                            <input type="number" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} className={fieldClass} />
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">Update Event</button>
                </form>
            </div>
        </AppLayout>
    );
}
