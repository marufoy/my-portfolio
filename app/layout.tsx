import type { Metadata } from "next";
import Script from "next/script";
import { Inter, DotGothic16, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GA_MEASUREMENT_ID = "G-WJHX11TB32";

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
  title: "MaruyamaRyoの日誌というか記録というかポートフォリオ",
  description: "Next.jsで作成したポートフォリオサイトです。日々の学習や制作の記録を残しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${dotGothic16.variable} ${pressStart2P.variable}`}>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        {children}
        <Footer ownerName="丸山涼" year={2024} />
      </body>
    </html>
  );
}
