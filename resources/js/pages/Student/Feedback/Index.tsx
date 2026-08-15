import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ pending, submitted }: any) {
    return (
        <AppLayout>
            <Head title="Feedback" />
            <div className="mx-auto max-w-4xl p-4">
                <h1 className="mb-6 text-2xl font-semibold">Event Feedback</h1>

                <section className="mb-8">
                    <h2 className="mb-3 text-lg font-medium">Pending Feedback</h2>
                    {pending.length ? (
                        <ul className="space-y-3">
                            {pending.map((registration: any) => (
                                <li key={registration.id} className="flex items-center justify-between rounded border p-4">
                                    <div>
                                        <div className="font-medium">{registration.event?.title}</div>
                                        <div className="text-sm text-gray-500">You attended this event</div>
                                    </div>
                                    <Link
                                        href={route('student.feedback.create', registration.id)}
                                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                                    >
                                        Submit Feedback
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-sm text-gray-500">No pending feedback.</div>
                    )}
                </section>

                <section>
                    <h2 className="mb-3 text-lg font-medium">Submitted Feedback</h2>
                    {submitted.data?.length ? (
                        <ul className="space-y-3">
                            {submitted.data.map((feedback: any) => (
                                <li key={feedback.id} className="rounded border p-4">
                                    <div className="font-medium">{feedback.event?.title}</div>
                                    <div className="mt-1 text-sm">Overall rating: {feedback.rating_overall}/5</div>
                                    {feedback.comment && <p className="mt-2 text-sm text-gray-600">{feedback.comment}</p>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-sm text-gray-500">No feedback submitted yet.</div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
