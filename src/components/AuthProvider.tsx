"use client";

import { useEffect } from "react";
import useStore, { getSessionFromCookie } from "@/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, user } = useStore();

  useEffect(() => {
    const sessionUser = getSessionFromCookie();
    
    if (sessionUser) {
      if (!user || user.id !== sessionUser.id) {
        setUser(sessionUser);
      }
    }
  }, []);

  return <>{children}</>;
}