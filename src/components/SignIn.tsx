"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { LogOut, User as UserIcon } from "lucide-react";

function SignIn() {
  const { user, logout } = useStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  const handleLogin = () => {
    router.push("/login");
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-darkColor">
          <UserIcon className="w-4 h-4" />
          <span className="hidden md:inline">{user.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold hover:text-revoshop-accent-hover text-darkColor hover:cursor-pointer hoverEffect flex items-center gap-1"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="text-sm font-semibold hover:text-revoshop-accent-hover text-darkColor hover:cursor-pointer hoverEffect"
    >
      Login
    </button>
  );
}

export default SignIn;
