import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ event, categories, venues }: any) {
  const { data, setData, put, processing } = useForm({
    title: event.title || '',
    slug: event.slug || '',
    short_description: event.short_description || '',
    description: event.description || '',
    category_id: event.category_id || '',
    venue_id: event.venue_id || '',
  });

  function submit(e: any) {
    e.preventDefault();
    put(`/coordinator/events/${event.id}`);
  }

  return (
    <AppLayout>
      <Head title="Edit Event" />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Edit Event</h1>
        <form onSubmit={submit} className="space-y-3 max-w-xl">
          <div>
            <label className="block">Title</label>
            <input value={data.title} onChange={e => setData('title', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block">Slug</label>
            <input value={data.slug} onChange={e => setData('slug', e.target.value)} className="input" />
          </div>
          <div>
            <label className="block">Category</label>
            <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="input">
              <option value="">Choose</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" disabled={processing} className="btn">Update</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
