import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientLayout from "@/components/ClientLayout";
import MainContentWrapper from "@/components/MainContentWrapper";
import { AuthProvider } from "@/context/AuthContext";
import NexusChatbot from "@/components/NexusChatbot";
import { seokeywords } from "@/data/seo_keywords";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Somahorse Nexus",
  description: "The AI Talent Operating System",
  keywords: seokeywords,
  applicationName: "Somahorse Nexus",
  authors: [{ name: "Somahorse Nexus Team", url: "https://www.somahorsenexus.com/about" }],
  creator: "Somahorse Nexus Team",
  publisher: "Somahorse Nexus Team",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  openGraph: {
    title: "Somahorse Nexus",
    description:
      "The AI Talent Operating System",
    url: "https://www.somahorsenexus.com/",
    siteName: "Somahorse Nexus",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "Somahorse Nexus",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Somahorse Nexus",
    description:
      "Somahorse Nexus delivers tailored AI solutions designed for Africa's key industries, building the operating system for Africa's AI economy.",
    site: "@somahorsenexus",
    creator: "@somahorsenexus",
    images: ["./favicon.ico"],
  },
  metadataBase: new URL("https://www.somahorsenexus.com/"),
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
