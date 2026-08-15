<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Certificate Verification</title>
  <style> body { font-family: Arial, sans-serif; padding:20px } </style>
</head>
<body>
  <h1>Certificate Verification</h1>
  <p>Certificate Number: {{ $certificate->certificate_number }}</p>
  <p>Name: {{ $certificate->registration->user->name }}</p>
  <p>Event: {{ $certificate->registration->event->title }}</p>
  <p>Issued at: {{ $certificate->issued_at }}</p>
</body>
</html>
