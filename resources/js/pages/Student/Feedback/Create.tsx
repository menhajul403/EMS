import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ registration }: any) {
    const { data, setData, post, processing, errors } = useForm({
        rating_overall: 5,
        rating_speaker: 5,
        rating_organization: 5,
        rating_venue: 5,
        comment: '',
        suggestions: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('student.feedback.store', registration.id));
    }

    return (
        <AppLayout>
            <Head title="Submit Feedback" />
            <div className="mx-auto max-w-xl p-4">
                <h1 className="mb-2 text-2xl font-semibold">Feedback for {registration.event?.title}</h1>
                <form onSubmit={submit} className="mt-6 space-y-4">
                    {[
                        ['rating_overall', 'Overall'],
                        ['rating_speaker', 'Speaker'],
                        ['rating_organization', 'Organization'],
                        ['rating_venue', 'Venue'],
                    ].map(([field, label]) => (
                        <div key={field}>
                            <label className="block text-sm font-medium">{label}</label>
                            <select
                                value={data[field as keyof typeof data] as number}
                                onChange={(e) => setData(field as keyof typeof data, Number(e.target.value) as never)}
                                className="mt-1 w-full rounded border px-3 py-2"
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label className="block text-sm font-medium">Comment</label>
                        <textarea
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                            rows={4}
                        />
                        {errors.comment && <div className="text-sm text-red-600">{errors.comment}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Suggestions</label>
                        <textarea
                            value={data.suggestions}
                            onChange={(e) => setData('suggestions', e.target.value)}
                            className="mt-1 w-full rounded border px-3 py-2"
                            rows={3}
                        />
                    </div>
                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
