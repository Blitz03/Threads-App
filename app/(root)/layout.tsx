import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads Clone App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>
          <Toaster />

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
