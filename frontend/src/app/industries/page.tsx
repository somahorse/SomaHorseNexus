import IndustriesPageClient from "@/components/industries-page/IndustriesPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Somahorse Nexus",
  description:
    "Explore the industries Somahorse Nexus serves, delivering innovative digital solutions tailored to various sectors including finance, healthcare, education, and more.",
  keywords: [
    "Somahorse Nexus",
    "industries",
    "digital solutions",
    "technology services",
    "finance technology",
    "healthcare solutions",
    "education technology",
    "IT consulting",
  ],
  authors: [{ name: "Somahorse Nexus" }],
  creator: "Somahorse Nexus",

  openGraph: {
    title: "Industries We Serve | Somahorse Nexus",
    description:
      "Discover how Somahorse Nexus provides tailored technology solutions across multiple industries to drive growth and innovation.",
    url: "https://www.somahorsenexus.com/industries",
    siteName: "Somahorse Nexus",
    images: [
      {
        url: "https://www.somahorsenexus.com/_next/image?url=%2Fsomahorse-logo.png&w=828&q=75",
        width: 1200,
        height: 630,
        alt: "Somahorse Nexus Industries",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Somahorse Nexus",
    description:
      "Learn how Somahorse Nexus supports various industries with innovative digital and technology solutions.",
    images: ["https://www.somahorsenexus.com/industries"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.somahorsenexus.com/industries",
  },
};

export default function Page() {
  return <IndustriesPageClient />;
}