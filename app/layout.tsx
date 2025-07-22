import type { Metadata } from "next";
import "./globals.css";
import iransans from "./fonts/IranSans";
import StoreProvider from "./components/Utils/StoreProvider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Caroption",
  description: "caroption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${iransans.className} antialiased`}>
        <StoreProvider>
          <SessionProvider>{children}</SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
