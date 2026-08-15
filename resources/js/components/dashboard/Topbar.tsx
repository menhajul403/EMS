import { Link, usePage } from '@inertiajs/react';

export default function Topbar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    return (
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium">Dashboard</h2>
            </div>

            <div className="flex items-center gap-3">
                {user && (
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                        <img src={user.avatar || '/build/assets/default-avatar.png'} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    );
}
