import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ events }: any) {
  return (
    <AppLayout>
      <Head title="Events" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Events</h1>
          <Link href="/coordinator/events/create" className="btn">Create Event</Link>
        </div>

        <div>
          {events.data?.length ? (
            <ul>
              {events.data.map((e: any) => (
                <li key={e.id} className="mb-2 border p-2 rounded">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{e.title}</div>
                      <div className="text-sm text-muted">{e.short_description}</div>
                    </div>
                    <div>
                      <Link href={`/coordinator/events/${e.id}/edit`} className="text-blue-600 mr-2">Edit</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No events yet.</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
