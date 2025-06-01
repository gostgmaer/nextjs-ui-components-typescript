"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const setSessionCookies = async () => {
        try {
          await fetch("/api/auth/set-cookies");
        } catch (error) {
          console.error("Failed to set session cookies:", error);
        }
      };

      setSessionCookies();
    }
  }, [status]);

  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4">{children}</main>
        <Footer />
      </div>
  );
}
