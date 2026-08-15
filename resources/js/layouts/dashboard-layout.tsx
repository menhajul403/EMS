import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800">
            <div className="flex">
                <Sidebar />
                <div className="flex min-h-screen flex-1 flex-col">
                    <Topbar />
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
