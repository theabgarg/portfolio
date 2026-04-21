import ThemeProvider from "@/components/ThemeProvider";
import { PROFILE } from "@/data/profile";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhishek | Software Developer",
  description:
    "Hey! I'm Abhishek, a Software Engineer focused on high-performance web applications.",
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
    title: "Abhishek | Software Developer",
    description:
      "Hey! I'm Abhishek, a Software Engineer focused on high-performance web applications.",
    type: "website",
    url: "https://portfolio-theabgarg.vercel.app/",
    siteName: "Abhishek Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek | Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek | Software Developer",
    description:
      "Hey! I'm Abhishek, a Software Engineer focused on high-performance web applications.",
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
