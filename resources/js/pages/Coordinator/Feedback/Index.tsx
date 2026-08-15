import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ event, feedbacks, averages }: any) {
    return (
        <AppLayout>
            <Head title={`Feedback — ${event.title}`} />
            <div className="mx-auto max-w-4xl p-4">
                <Link href={route('coordinator.events.index')} className="text-sm text-blue-600">
                    Back to events
                </Link>
                <h1 className="mt-4 text-2xl font-semibold">Feedback: {event.title}</h1>

                <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Overall</div>
                        <div className="text-2xl font-semibold">{Number(averages?.overall || 0).toFixed(1)}</div>
                    </div>
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Speaker</div>
                        <div className="text-2xl font-semibold">{Number(averages?.speaker || 0).toFixed(1)}</div>
                    </div>
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Organization</div>
                        <div className="text-2xl font-semibold">{Number(averages?.organization || 0).toFixed(1)}</div>
                    </div>
                    <div className="rounded border p-4">
                        <div className="text-sm text-gray-500">Total Responses</div>
                        <div className="text-2xl font-semibold">{averages?.total || 0}</div>
                    </div>
                </div>

                <ul className="mt-6 space-y-3">
                    {feedbacks.data?.length ? (
                        feedbacks.data.map((feedback: any) => (
                            <li key={feedback.id} className="rounded border p-4">
                                <div className="font-medium">{feedback.student?.name}</div>
                                <div className="text-sm text-gray-500">Overall: {feedback.rating_overall}/5</div>
                                {feedback.comment && <p className="mt-2 text-sm">{feedback.comment}</p>}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No feedback yet.</li>
                    )}
                </ul>
            </div>
        </AppLayout>
    );
}
