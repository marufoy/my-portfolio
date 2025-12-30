import type { Metadata } from "next";
import { Inter, DotGothic16, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const dotGothic16 = DotGothic16({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic16",
});
const pressStart2P = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "丸山涼のポートフォリオ",
  description: "Next.jsで作成したポートフォリオサイトです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${dotGothic16.variable} ${pressStart2P.variable}`}>
        <Header />
        {children}
        <Footer ownerName="丸山涼" year={2024} />
      </body>
    </html>
  );
}
