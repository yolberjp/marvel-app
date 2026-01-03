import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { FavoriteCharactersProvider } from "./contexts/FavoriteCharactersContext";
import { Header } from "./components/header";

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
      <body className={`${robotoCondensed.variable} antialiased`}>
        <FavoriteCharactersProvider>
          <Header />
          {children}
        </FavoriteCharactersProvider>
      </body>
    </html>
  );
}
