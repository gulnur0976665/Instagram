"use client";

import { useState, useEffect } from "react";
import ResetPage from "@/components/auth/pages/ReserPage";

const Page = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(
        "/api/token?token=" + window.location.search
      );
      const data = await response.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return <ResetPage token={token} />;
};

export default Page;
