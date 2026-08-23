import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

import { Activity, BarChart3, BookOpen, CalendarDays, ClipboardCheck, FileBadge2, FolderKanban, LayoutGrid, MessageSquare, Users, QrCode, Building2 } from 'lucide-react';

const footerNavItems: NavItem[] = [
    {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const roles = Array.isArray(auth?.user?.roles) ? (auth.user.roles as string[]) : [];
    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
        { title: 'Discover Events', url: '/events', icon: CalendarDays },
        ...(roles.includes('Student') ? [
            { title: 'My Events', url: '/student/registrations', icon: FolderKanban },
            { title: 'Certificates', url: '/student/registrations', icon: FileBadge2 },
            { title: 'Feedback', url: '/student/feedback', icon: MessageSquare },
        ] : []),
        ...(roles.includes('Coordinator') ? [
            { title: 'Manage Events', url: '/coordinator/events', icon: FolderKanban },
            { title: 'Attendance', url: '/coordinator/attendance/scan', icon: QrCode },
            { title: 'Certificates', url: '/coordinator/events', icon: FileBadge2 },
            { title: 'Reports', url: '/reports', icon: BarChart3 },
        ] : []),
        ...(roles.includes('Faculty') ? [{ title: 'Approvals', url: '/faculty/events', icon: ClipboardCheck }] : []),
        ...(roles.includes('University Admin') ? [
            { title: 'Users', url: '/university/users', icon: Users },
            { title: 'Departments', url: '/university/departments', icon: Building2 },
            { title: 'Clubs', url: '/university/clubs', icon: Activity },
            { title: 'Reports', url: '/reports', icon: BarChart3 },
        ] : []),
        ...(roles.includes('Super Admin') ? [{ title: 'Universities', url: '/super-admin/universities', icon: Building2 }] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
