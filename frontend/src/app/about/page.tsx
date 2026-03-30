import AboutPage from "@/components/about-page/AboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Somahorse Nexus",
  description:
    "Learn more about Somahorse Nexus — our mission, vision, and the team dedicated to delivering innovative solutions and exceptional digital experiences.",
  keywords: [
    "Somahorse Nexus",
    "About Somahorse Nexus",
    "company profile",
    "digital solutions",
    "tech company",
    "innovation",
    "team",
  ],
  authors: [{ name: "Somahorse Nexus" }],
  creator: "Somahorse Nexus",

  openGraph: {
    title: "About Us | Somahorse Nexus",
    description:
      "Discover the story behind Somahorse Nexus, our mission, and how we are shaping the future with innovative digital solutions.",
    url: "https://www.somahorsenexus.com/about",
    siteName: "Somahorse Nexus",
    images: [
      {
        url: "https://www.somahorsenexus.com/_next/image?url=%2Fsomahorse-logo.png&w=828&q=75",
        width: 1200,
        height: 630,
        alt: "Somahorse Nexus About Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Somahorse Nexus",
    description:
      "Learn about Somahorse Nexus, our mission, vision, and innovative solutions.",
    images: ["ttps://www.somahorsenexus.com/about"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "ttps://www.somahorsenexus.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}