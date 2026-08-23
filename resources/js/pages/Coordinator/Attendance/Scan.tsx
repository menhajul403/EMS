import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Scan() {
  const { data, setData, post, processing } = useForm<{ code: string }>({ code: '' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState('');

  useEffect(() => {
    const BarcodeDetector = (window as any).BarcodeDetector;
    if (!BarcodeDetector || !videoRef.current) {
      setCameraError('Camera scanning is not supported in this browser. Enter the QR code manually.');
      return;
    }

    let active = true;
    let stream: MediaStream;
    const detector = new BarcodeDetector({ formats: ['qr_code'] });

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(async (mediaStream) => {
        stream = mediaStream;
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        while (active && videoRef.current) {
          const codes = await detector.detect(videoRef.current);
          if (codes[0]?.rawValue) {
            setData('code', codes[0].rawValue);
            active = false;
          }
          await new Promise((resolve) => window.setTimeout(resolve, 250));
        }
      })
      .catch(() => setCameraError('Camera permission was not granted. Enter the QR code manually.'));

    return () => {
      active = false;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [setData]);

  function submit(e: any) {
    e.preventDefault();
    post(route('coordinator.attendance.scan.store'));
  }

  return (
    <AppLayout>
      <Head title="Scan Attendance" />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Scan Attendance</h1>
        <video ref={videoRef} className="mb-3 w-full rounded border" muted playsInline />
        {cameraError && <p className="mb-3 text-sm text-amber-700">{cameraError}</p>}
        <form onSubmit={submit} className="space-y-3">
          <input value={data.code} onChange={e => setData('code', e.target.value)} placeholder="Paste QR code here" className="input w-full" />
          <div>
            <button type="submit" disabled={processing} className="btn">Check In</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
