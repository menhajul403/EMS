<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificate of Participation</title>
  <style>
    body { font-family: DejaVu Sans, sans-serif; margin: 0; padding: 40px; }
    .border { border: 8px double #1e40af; padding: 40px; }
    .header { text-align: center; color: #1e3a8a; font-size: 28px; font-weight: bold; }
    .subheader { text-align: center; color: #64748b; margin-top: 8px; font-size: 14px; }
    .body { text-align: center; margin-top: 40px; }
    .name { font-size: 32px; font-weight: bold; color: #0f172a; margin: 16px 0; }
    .event { font-size: 22px; color: #1e40af; margin: 12px 0; }
    .meta { font-size: 14px; color: #475569; margin-top: 8px; }
    .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    .signature { margin-top: 40px; text-align: center; }
    .line { border-top: 1px solid #334155; width: 200px; margin: 0 auto 8px; }
  </style>
</head>
<body>
  <div class="border">
    <div class="header">{{ config('app.name') }}</div>
    <div class="subheader">Certificate of Participation</div>

    <div class="body">
      <div class="meta">This is to certify that</div>
      <div class="name">{{ $registration->user->name }}</div>
      <div class="meta">Student ID: {{ $registration->user->id }}</div>
      <div class="meta">has successfully participated in</div>
      <div class="event">{{ $registration->event->title }}</div>
      <div class="meta">held on {{ $registration->event->start_at?->toFormattedDateString() ?? 'N/A' }}</div>
    </div>

    <div class="signature">
      <div class="line"></div>
      <div class="meta">Authorized Signature</div>
    </div>

    <div class="footer">
      Certificate No: {{ $certificate_number }}<br>
      Issue Date: {{ now()->toFormattedDateString() }}<br>
      Verification Code: {{ $verification_code }}
    </div>
  </div>
</body>
</html>
