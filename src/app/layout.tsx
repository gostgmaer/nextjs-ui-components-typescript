import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/components/providers";
import { SessionProviderWrapper } from "@/components/Sessionproviders";
import { MainLayout } from "@/components/layout/main-layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/authOptions";
import Dashboard from "@/components/layout/dashboard";

// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth - Modern Authentication System",
  description:
    "A comprehensive authentication and user management system with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log("session", session);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <SessionProviderWrapper>
          <Providers>
            {!session ? (
              <MainLayout>{children}</MainLayout>
            ) : (
              <Dashboard>
                <main className="flex-grow container mx-auto px-4">
                  {children}
                </main>
              </Dashboard>
            )}
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
