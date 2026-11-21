import type { Metadata } from "next";
import { Oswald, Noto_Sans, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Visit Nepal — Naturally Nepal | Official Tourism Portal",
  description: "Somewhere between earth and heaven. Discover extraordinary Himalayan landscapes, ancient UNESCO heritage, and unforgettable journeys across Nepal.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${notoSans.variable} ${robotoCondensed.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#17212B] font-sans selection:bg-[#0552A2] selection:text-white">
        {children}
      </body>
    </html>
  );
}
