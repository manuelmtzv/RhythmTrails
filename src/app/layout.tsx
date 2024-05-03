import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import TheHeader from "@/components/base/TheHeader";
import TheFooter from "@/components/base/TheFooter";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rhythm Trails",
  description:
    "A web app to view own Spotify stats and get new music recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <TheHeader />

        <main className="main">{children}</main>

        <TheFooter />
      </body>
    </html>
  );
}
