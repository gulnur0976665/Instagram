"use client"
import LayoutAuth from '@/components/auth/layout/LayoutAuth';
import { FC, ReactNode } from 'react';
interface LayoutType {
	children: ReactNode;
}
const Layout: FC<LayoutType> = ({ children }) => {
	return <LayoutAuth>{children}</LayoutAuth>;
};
export default Layout;