import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src="/logo.png" alt="EDU EVENTS" className={className} />;
}
