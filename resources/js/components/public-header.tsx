import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import BrandLogo from '@/components/brand-logo';
import { Link, usePage } from '@inertiajs/react';

type PublicHeaderProps = {
    active?: 'home' | 'events' | 'gallery' | 'about' | 'contact';
};

const links = [
    { key: 'home', label: 'Home', routeName: 'home' },
    { key: 'events', label: 'Events', routeName: 'events.index' },
    { key: 'gallery', label: 'Gallery', routeName: 'gallery.index' },
    { key: 'about', label: 'About', routeName: 'about' },
    { key: 'contact', label: 'Contact', routeName: 'contact' },
] as const;

export default function PublicHeader({ active }: PublicHeaderProps) {
    const { auth } = usePage().props as any;

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
                <BrandLogo href={route('home')} />
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.key}
                            href={route(link.routeName)}
                            className={active === link.key ? 'font-semibold text-primary' : 'transition hover:text-primary'}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <AppearanceToggleDropdown />
                    {auth?.user ? (
                        <Link href={route('dashboard')} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                            Open portal
                        </Link>
                    ) : (
                        <Link href={route('login')} className="text-sm font-medium text-muted-foreground transition hover:text-primary">
                            Log in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
