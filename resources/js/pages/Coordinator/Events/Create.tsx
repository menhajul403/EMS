import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categories, venues }: any) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    category_id: '',
    venue_id: '',
  });

  function submit(e: any) {
    e.preventDefault();
    post('/coordinator/events');
  }

  return (
    <AppLayout>
      <Head title="Create Event" />
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Create Event</h1>
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
            <button type="submit" disabled={processing} className="btn">Create</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
