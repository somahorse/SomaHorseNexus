import ServicePageClient from "@/components/services-page/ServicePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Somahorse Nexus",
  description:
    "Explore the services offered by Somahorse Nexus, from innovative digital solutions to cutting-edge technology services designed to elevate your business.",
  keywords: [
    "Somahorse Nexus",
    "digital services",
    "technology solutions",
    "web development",
    "innovation",
    "consulting",
    "IT services",
  ],
  authors: [{ name: "Somahorse Nexus" }],
  creator: "Somahorse Nexus",

  openGraph: {
    title: "Our Services | Somahorse Nexus",
    description:
      "Discover the wide range of services Somahorse Nexus offers to help your business thrive in the digital era.",
    url: "https://www.somahorsenexus.com/services",
    siteName: "Somahorse Nexus",
    images: [
      {
        url: "https://www.somahorsenexus.com/_next/image?url=%2Fsomahorse-logo.png&w=828&q=75",
        width: 1200,
        height: 630,
        alt: "Somahorse Nexus Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Services | Somahorse Nexus",
    description:
      "Learn about the services Somahorse Nexus provides, including digital solutions, consulting, and IT innovation.",
    images: ["https://www.somahorsenexus.com/services"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.somahorsenexus.com/services",
  },
};

export default function Page() {
  return <ServicePageClient />;
}