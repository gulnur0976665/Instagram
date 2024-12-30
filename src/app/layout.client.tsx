'use client';
import ReduxProvider from '@/providers/ReduxProvider';
import { SessionProvider } from '@/providers/SessionProvider';
import React, { FC, ReactNode } from 'react';

interface RootLayoutClientProps {
	children: ReactNode;
}

const LayoutClient: FC<RootLayoutClientProps> = ({ children }) => {
	return (
		<>
			<ReduxProvider>
				<SessionProvider>
					{children}
					</SessionProvider>
			</ReduxProvider>
		</>
	);
};

export default LayoutClient;