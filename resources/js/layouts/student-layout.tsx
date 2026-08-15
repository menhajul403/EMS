import React from 'react';
import AppLayout from '@/layouts/app-layout';

type Props = {
	children: React.ReactNode;
	breadcrumbs?: any;
};

export default function StudentLayout({ children, ...props }: Props) {
	return <AppLayout {...props}>{children}</AppLayout>;
}
