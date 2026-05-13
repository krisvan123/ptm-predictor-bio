import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PTM Predictor — Kelompok 5",
  description: "Prediksi Situs Post-Translational Modification menggunakan 1D-CNN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
