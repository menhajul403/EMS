<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificate</title>
  <style>
    body { font-family: DejaVu Sans, sans-serif; text-align:center; padding:40px }
    .header { font-size:24px; font-weight:bold }
    .sub { margin-top:20px }
    .footer { margin-top:40px; font-size:12px }
  </style>
</head>
<body>
  <div class="header">{{ config('app.name') }} Certificate of Attendance</div>
  <div class="sub">This certifies that</div>
  <h2>{{ $registration->user->name }}</h2>
  <div class="sub">has attended</div>
  <h3>{{ $registration->event->title }}</h3>
  <div class="sub">on {{ $registration->event->start_at?->toFormattedDateString() }}</div>

  <div class="footer">Certificate No: {{ $certificate_number }} | Verification Code: {{ $verification_code }}</div>
</body>
</html>
