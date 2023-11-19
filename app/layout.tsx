import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { StoreProvider } from "./store/storeProvider";

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
      <html lang="en">
        <body className={`${rubik.className} dark:bg-slate-950 bg-Lightbackground`}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
