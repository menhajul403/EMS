import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import FlashMessages from '@/components/flash-messages';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex">
                <Sidebar />
                <div className="flex min-h-screen flex-1 flex-col">
                    <Topbar />
                    <FlashMessages />
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
