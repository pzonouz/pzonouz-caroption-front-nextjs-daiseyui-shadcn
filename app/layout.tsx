import type { Metadata } from "next";
import "./globals.css";
import iransans from "./fonts/IranSans";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./components/Shared/StoreProvider";

export const metadata: Metadata = {
  title: {
    default: "کارآپشن",
    template: "%s - کارآپشن",
  },
  description: "مرکز تخصصی آپشن خودرو",
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
