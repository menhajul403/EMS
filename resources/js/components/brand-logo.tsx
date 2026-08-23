import { Link } from '@inertiajs/react';

type BrandLogoProps = {
    href?: string;
    compact?: boolean;
    dark?: boolean;
};

export default function BrandLogo({ href, compact = false, dark = false }: BrandLogoProps) {
    const content = (
        <span className="flex items-center gap-3">
            <img src="/logo.png" alt="EDU EVENTS - Academic Event Management System" className={compact ? 'h-10 w-20 rounded-md object-contain' : 'h-12 w-24 rounded-md object-contain'} />
            {!compact && <span className={`leading-tight ${dark ? 'text-white' : 'text-[#0b477a]'}`}><span className="block text-sm font-extrabold tracking-[.08em]">EDU EVENTS</span><small className={`block text-[9px] font-semibold tracking-[.12em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>ACADEMIC EVENT MANAGEMENT SYSTEM</small></span>}
        </span>
    );

    return href ? (
        <Link href={href} className="inline-flex items-center">
            {content}
        </Link>
    ) : (
        content
    );
}
