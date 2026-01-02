import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { HeaderFavoriteButton } from "./components/header-favorite-button";
import Image from "next/image";
import Link from "next/link";


const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Marvel App",
  description: "All the Marvel characters you love, in one place.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} antialiased`}
      >
        <header className="flex flex-row justify-between items-center px-12 py-4 w-full h-fit bg-black text-white">
          <Link href="/">
            <Image src="/marvel.svg" alt="Marvel Logo" width={130} height={52} />
          </Link>

          <HeaderFavoriteButton />
        </header>
          {children}
      </body>
    </html>
  );
}
