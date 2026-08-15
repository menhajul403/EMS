import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';

export default function QRCode({ registration }: any) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (registration?.qr_code) {
      QRCodeLib.toDataURL(registration.qr_code)
        .then(url => setSrc(url))
        .catch(() => setSrc(''));
    }
  }, [registration]);

  return (
    <AppLayout>
      <Head title="My QR" />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Your QR Code</h1>
        <div className="border p-4 rounded text-center">
          <div className="mb-2">Registration ID: {registration.id}</div>
          {src ? (
            <img src={src} alt="QR Code" className="mx-auto" />
          ) : (
            <pre className="bg-gray-100 p-2 rounded">{registration.qr_code}</pre>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
