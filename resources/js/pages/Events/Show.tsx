import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ event, registration }: any) {
    const { auth } = usePage().props as any;
    const { post, delete: destroy, processing } = useForm();

    const isStudent = auth?.user?.roles?.includes('Student');
    const isRegistered = registration?.status === 'registered';
    const hasAttended = Boolean(registration?.attended_at);
    const canRegister = isStudent && event.status === 'published' && !isRegistered && !hasAttended;

    function register(e: React.FormEvent) {
        e.preventDefault();
        post(route('student.events.register', event.id));
    }

    function cancelRegistration(e: React.FormEvent) {
        e.preventDefault();
        destroy(route('student.events.cancel', event.id));
    }

    return (
        <AppLayout>
            <Head title={event.title} />
            <div className="mx-auto max-w-3xl p-4">
                <Link href={route('events.index')} className="text-sm text-blue-600">Back to events</Link>

                <img
                    src={event.banner ? `/storage/${event.banner}` : 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85'}
                    alt=""
                    className="mt-4 h-64 w-full rounded-xl object-cover"
                />

                <h1 className="mt-4 text-3xl font-bold">{event.title}</h1>
                <p className="mt-2 text-gray-600">{event.short_description}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <div>Status: {event.status}</div>
                    <div>{event.start_at ? new Date(event.start_at).toLocaleString() : 'Date TBA'}</div>
                    {event.venue?.name && <div>Venue: {event.venue.name}</div>}
                    {event.category?.name && <div>Category: {event.category.name}</div>}
                    {event.department?.name && <div>Department: {event.department.name}</div>}
                </div>

                {event.description && (
                    <div className="prose mt-6 max-w-none dark:prose-invert">
                        <p>{event.description}</p>
                    </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                    {!auth?.user ? (
                        <Link href={route('login')} className="rounded bg-blue-600 px-4 py-2 text-white">
                            Log in to register
                        </Link>
                    ) : canRegister ? (
                        <form onSubmit={register}>
                            <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                                Register for Event
                            </button>
                        </form>
                    ) : isStudent && isRegistered ? (
                        <>
                            <Link href={route('student.registrations.qr', registration.id)} className="rounded border px-4 py-2">
                                View QR Code
                            </Link>
                            <form onSubmit={cancelRegistration}>
                                <button type="submit" disabled={processing} className="rounded border px-4 py-2 text-red-600">
                                    Cancel Registration
                                </button>
                            </form>
                        </>
                    ) : isStudent && hasAttended ? (
                        <>
                            <span className="rounded bg-green-100 px-3 py-2 text-sm text-green-800">You attended this event</span>
                            {registration?.id && (
                                <a href={route('certificates.generate', registration.id)} className="rounded bg-blue-600 px-4 py-2 text-white">
                                    Download Certificate
                                </a>
                            )}
                        </>
                    ) : isStudent ? (
                        <span className="text-sm text-gray-500">Registration is not available for this event.</span>
                    ) : (
                        <span className="text-sm text-gray-500">Only students can register for events.</span>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
