"use client";
import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMeQuery, useRefreshTokenMutation } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = async () => {
    if (typeof window !== "undefined") {
      const localStorageData = JSON.parse(localStorage.getItem("tokens")!);
      if (localStorageData === "undefined" || localStorageData === undefined) {
        localStorage.removeItem("tokens");
      }
      if (localStorageData) {
        const { accessTokenExpiration, refreshToken } = localStorageData;
        if (accessTokenExpiration < new Date().getTime()) {
          localStorage.removeItem("tokens");
          const { data } = await refreshTokenMutation({ refreshToken });
          localStorage.setItem("tokens", JSON.stringify(data));
          window.location.reload();
        } else {
          console.log("refreshToken активдүү!");
        }
      }
    }
  };

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (status === "fulfilled") {
          router.push("/");
        }
        break;
      case "/":
      case "/profile":
        if (status === "rejected") {
          router.push("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, [pathname]);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return <>{children}</>;
};
