<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Event Registrations Report</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #1f2937; margin: 24px; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        .meta { font-size: 12px; color: #4b5563; margin-bottom: 18px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #d1d5db; padding: 8px; font-size: 11px; text-align: left; vertical-align: top; }
        th { background: #e5e7eb; }
    </style>
</head>
<body>
    <h1>Event Registrations Report</h1>
    <div class="meta">Event: {{ $eventName }} | Generated: {{ $generatedAt }}</div>

    <table>
        <thead>
            <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Event</th>
                <th>Status</th>
                <th>Attended</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($registrations as $registration)
                <tr>
                    <td>{{ $registration->user?->name ?? '—' }}</td>
                    <td>{{ $registration->user?->email ?? '—' }}</td>
                    <td>{{ $registration->user?->student_id ?? '—' }}</td>
                    <td>{{ $registration->user?->phone ?? '—' }}</td>
                    <td>{{ $registration->user?->department?->name ?? '—' }}</td>
                    <td>{{ $registration->event?->title ?? '—' }}</td>
                    <td>{{ $registration->status }}</td>
                    <td>{{ $registration->attended_at ? 'Yes' : 'No' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="8">No registrations found.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
