import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { StoreProvider } from "./store/storeProvider";
import { AppProvider } from "./context/AppContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noteeey",
  description: "Create and share notes online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AppProvider>
        <html lang="en">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icon.png"></link>
            <meta name="theme-color" content="#fff" />
          </head>
          <body className={`${rubik.className} dark:bg-[#1C1C1C] bg-[#FFF]`}>
            {children}
          </body>
        </html>
      </AppProvider>
    </StoreProvider>
  );
}
