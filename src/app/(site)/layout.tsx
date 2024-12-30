"use client"
import LayoutSite from "@/components/site/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface IlayoutProps {
    children: ReactNode;
}

const layout: FC<IlayoutProps> = ({ children }) => {
    return <LayoutSite>{children}</LayoutSite>;
};

export default layout;