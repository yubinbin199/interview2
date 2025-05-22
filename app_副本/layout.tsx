'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, App as AntdApp } from "antd";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>G123 CS</title>
        <meta name="description" content="Enterprise system prototype built with Next.js and Ant Design" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1677ff",
              },
            }}
          >
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
