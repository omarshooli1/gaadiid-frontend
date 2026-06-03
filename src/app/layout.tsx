import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaadiid – Ride Sharing in Somaliland",
  description: "Book a ride in seconds. Safe, affordable, and reliable transport across Somaliland. Download the Gaadiid app today.",
  keywords: "ride sharing, Somaliland, Hargeisa, taxi app, Gaadiid, transport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="so" className="h-full">
      <body className="min-h-full flex flex-col bg-[#080808] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
