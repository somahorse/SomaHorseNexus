import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientLayout from "@/components/ClientLayout";
import MainContentWrapper from "@/components/MainContentWrapper";
import { AuthProvider } from "@/context/AuthContext";
import NexusChatbot from "@/components/NexusChatbot";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Somahorse Nexus",
  description: "The AI Talent Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} antialiased overflow-x-hidden`}
      >
        <ClientLayout>
          <AuthProvider>
            <Navbar />
            <MainContentWrapper>
              {children}
            </MainContentWrapper>
            <NexusChatbot />
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
