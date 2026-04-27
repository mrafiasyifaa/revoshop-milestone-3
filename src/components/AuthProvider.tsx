"use client";

import { useEffect } from "react";
import useStore from "@/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, user } = useStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(({ user: sessionUser }) => {
        if (sessionUser && (!user || user.id !== sessionUser.id)) {
          setUser(sessionUser);
        }
      })
      .catch(() => {});
  }, []);

  return <>{children}</>;
}