import ThemeProvider from "@/components/ThemeProvider";
import { PROFILE } from "@/data/profile";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theabgarg.com"),
  title: "Abhishek | Software Engineer",
  description:
    "Abhishek Garg is a Software Engineer with 5+ years of experience building high-performance web applications with React, Next.js, and Golang.",
  keywords: [
    "Software Engineer",
    "Abhishek Garg",
    "theabgarg",
    "Web Developer",
    "React",
    "Next.js",
    "Golang",
  ],
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: "Abhishek | Software Engineer",
    description:
      "Abhishek Garg is a Software Engineer with 5+ years of experience building high-performance web applications with React, Next.js, and Golang.",
    type: "website",
    url: "https://theabgarg.com",
    siteName: "Abhishek Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek | Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek | Software Engineer",
    description:
      "Abhishek Garg is a Software Engineer with 5+ years of experience building high-performance web applications with React, Next.js, and Golang.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('light',t==='light')}catch(e){document.documentElement.classList.remove('light')}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
