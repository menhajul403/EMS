import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Scan() {
  const { data, setData, post, processing } = useForm({ code: '' });

  function submit(e: any) {
    e.preventDefault();
    post(route('coordinator.attendance.scan.store'));
  }

  return (
    <AppLayout>
      <Head title="Scan Attendance" />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Scan Attendance (enter QR code)</h1>
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
