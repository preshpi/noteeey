import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { StoreProvider } from "./store/storeProvider";
import { DarkModeProvider } from "./context/DarkmodeContext";

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
      <DarkModeProvider>
        <html lang="en">
          <body
            className={`${rubik.className} dark:bg-[#1c1c1c] bg-Lightbackground`}
          >
            {children}
          </body>
        </html>
      </DarkModeProvider>
    </StoreProvider>
  );
}
