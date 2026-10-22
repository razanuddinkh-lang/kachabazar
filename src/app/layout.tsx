import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "BazaarDor | বাংলাদেশের বাজারদর",
  description:
    "চাল, ডাল, সবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
