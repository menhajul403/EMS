import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ event, galleries }: any) {
    const { data, setData, post, processing } = useForm<{ images: File[]; caption: string }>({
        images: [],
        caption: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('coordinator.events.gallery.store', event.id), { forceFormData: true });
    }

    function removeImage(galleryId: number) {
        router.delete(route('coordinator.events.gallery.destroy', [event.id, galleryId]));
    }

    return (
        <AppLayout>
            <Head title={`Gallery — ${event.title}`} />
            <div className="mx-auto max-w-5xl p-4">
                <Link href={route('coordinator.events.index')} className="text-sm text-blue-600">
                    Back to events
                </Link>
                <h1 className="mt-4 text-2xl font-semibold">Gallery: {event.title}</h1>

                <form onSubmit={submit} className="mt-6 space-y-3 rounded border p-4">
                    <div>
                        <label className="block text-sm font-medium">Upload images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setData('images', Array.from(e.target.files || []))}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Caption</label>
                        <input
                            value={data.caption}
                            onChange={(e) => setData('caption', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                        />
                    </div>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                        Upload
                    </button>
                </form>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {galleries.data?.map((gallery: any) => (
                        <div key={gallery.id} className="overflow-hidden rounded border">
                            <img src={`/storage/${gallery.file_path}`} alt={gallery.caption || 'Event photo'} className="h-48 w-full object-cover" />
                            {gallery.caption && <div className="p-2 text-sm">{gallery.caption}</div>}
                            <button type="button" onClick={() => removeImage(gallery.id)} className="w-full p-2 text-sm text-red-600">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
