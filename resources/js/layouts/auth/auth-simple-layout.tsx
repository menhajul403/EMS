import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="bg-background grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative hidden overflow-hidden bg-slate-950 lg:block">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85" alt="Bangladeshi university students collaborating" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-slate-950/45" />
                <div className="relative flex h-full flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-3 text-lg font-semibold"><span className="flex size-9 items-center justify-center rounded-lg bg-emerald-400 text-slate-950"><AppLogoIcon className="size-5 fill-current" /></span>CampusConnect</div>
                    <div className="max-w-md"><p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Connect. Participate. Achieve.</p><h2 className="text-4xl font-semibold leading-tight">Your campus, moving together.</h2><p className="mt-4 text-slate-200">A trusted home for events, participation and achievement across Bangladesh.</p></div>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="text-sm font-semibold tracking-tight lg:hidden">CampusConnect</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            </div>
        </div>
    );
}
