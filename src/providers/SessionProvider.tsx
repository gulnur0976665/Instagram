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

  // localStorage маалыматтарын алуу
  const getTokens = () => {
    if (typeof window !== "undefined") {
      const localStorageData = localStorage.getItem("tokens");
      return localStorageData ? JSON.parse(localStorageData) : null;
    }
    return null;
  };

  const setTokens = (data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tokens", JSON.stringify(data));
    }
  };

  const removeTokens = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tokens");
    }
  };

  // Токенди жаңыртуу
  const handleRefreshToken = async () => {
    const tokens = getTokens();
    if (!tokens) {
      removeTokens();
      return;
    }

    const { accessTokenExpiration, refreshToken } = tokens;
    const isTokenExpired = accessTokenExpiration < new Date().getTime();

    if (isTokenExpired) {
      removeTokens();
      try {
        const { data } = await refreshTokenMutation({ refreshToken });
        setTokens(data);
        window.location.reload();
      } catch (error) {
        console.error("Токенди жаңыртууда ката кетти: ", error);
      }
    } else {
      console.log("Токендер активдүү!");
    }
  };

  // Навигацияны башкаруу
  const handleNavigation = () => {
    const authPaths = [
      "/auth/sign-in",
      "/auth/sign-up",
      "/auth/reset-password",
      "/auth/forgot",
    ];
    const protectedPaths = ["/", "/profile"];

    if (authPaths.includes(pathname) && status === "fulfilled") {
      router.push("/");
    }

    if (protectedPaths.includes(pathname) && status === "rejected") {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, [pathname]);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname]);

  return <>{children}</>;
};
