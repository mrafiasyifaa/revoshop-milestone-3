import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "RevoShop",
  description: "An e-commerce platform built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-lightColor">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
