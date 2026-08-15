import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ event, auth }: any) {
  const { post } = useForm();

  function register(e: any) {
    e.preventDefault();
    post(`/student/events/${event.id}/register`);
  }

  return (
    <AppLayout>
      <Head title={event.title} />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-muted my-2">{event.short_description}</p>

        <div className="mt-4">
          {auth.user ? (
            auth.user.role === 'Student' || true ? (
              <form onSubmit={register}>
                <button type="submit" className="btn">Register</button>
              </form>
            ) : (
              <div>You must be a student to register.</div>
            )
          ) : (
            <div>Please log in to register.</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
