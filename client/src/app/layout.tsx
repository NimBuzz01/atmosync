import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/session-wrapper";
import localFont from "next/font/local";
import { AmbianceProvider } from "@/contexts/ambiance-context";
import { MusicPlayerProvider } from "@/contexts/music-player-context";

const sfpro = localFont({
  src: [
    {
      path: "../fonts/sf-pro-display_thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/sf-pro-display_light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/sf-pro-display_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/sf-pro-display_medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/sf-pro-display_semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/sf-pro-display_bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
});

export const metadata: Metadata = {
  title: "Atmosync | Music App",
  description: "Music Recommendation System Based on Room Ambiance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${sfpro.className} bg-slate-50 h-screen text-slate-900 relative dark:bg-slate-900 dark:text-slate-100`}
        >
          <AmbianceProvider>
            <MusicPlayerProvider>{children}</MusicPlayerProvider>
          </AmbianceProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
