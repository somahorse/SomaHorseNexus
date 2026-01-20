import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientLayout from "@/components/ClientLayout";
import MainContentWrapper from "@/components/MainContentWrapper";
import { AuthProvider } from "@/context/AuthContext";

const raleway = Raleway({ subsets: ["latin"] });

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
              {/* Padding for fixed navbar */}
              <div className="pt-20">
                {children}
              </div>
            </MainContentWrapper>
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
