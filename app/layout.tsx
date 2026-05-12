import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BookswapSessionProvider } from "@/components/bookswap/session-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BookSwap — Campus textbook exchange",
  description:
    "Swap textbooks with verified students. Browse, list, and trade on campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <BookswapSessionProvider>{children}</BookswapSessionProvider>
      </body>
    </html>
  );
}
