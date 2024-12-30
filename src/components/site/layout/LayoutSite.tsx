"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import scss from "./LayoutSite.module.scss";
import Footer from "./footer/Footer";
import { useGetMeQuery } from "@/redux/api/auth";
import Loader from "@/ui/Loader/Loader";
import Header from "./headers/Header";
import { usePathname } from "next/navigation";
import Category from "../pages/category/Category";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
  const [isPreLoader, setIsPreloader] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/forgot":
      case "/auth/reset-password":
        setIsAuthPage(true);
        break;
      default:
        setIsAuthPage(false);
        break;
    }
  }, [pathname]);

  useEffect(() => {
    if (status === "fulfilled" || status === "rejected") {
      setTimeout(() => {
        setIsPreloader(false);
      }, 700);
    }
  }, [status]);

  return (
    <>
      {isPreLoader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className={scss.LayoutSite}>
            <Header />
            <main>{children}</main>
            <Footer />
            {!isAuthPage && <Category />}
          </div>
        </>
      )}
    </>
  );
};
export default LayoutSite;
