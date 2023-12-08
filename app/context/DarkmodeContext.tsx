"use client";
import React, { createContext, useEffect, useState } from "react";

interface DarkModeContextProps {
  children: React.ReactNode;
}

export const DarkmodeContext = createContext<
  [string | null, React.Dispatch<React.SetStateAction<string | null>>]
>([null, () => {}]);

export const DarkModeProvider: React.FC<DarkModeContextProps> = ({
  children,
}) => {
  const isBrowser = typeof window !== "undefined";
  const storedTheme = isBrowser ? localStorage.getItem("theme") : null;
  const [theme, setTheme] = useState<string | null>(storedTheme);

  useEffect(() => {
    if (isBrowser) {
      if (theme) {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
  }, [theme]);

  return (
    <DarkmodeContext.Provider value={[theme, setTheme]}>
      {children}
    </DarkmodeContext.Provider>
  );
};
