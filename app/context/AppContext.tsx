"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextProps {
  theme: string | null;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
  color: string | null;
  setColor: React.Dispatch<React.SetStateAction<string | null>>;
  isSideBarOpen: boolean | null;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== "undefined";
  const storedTheme = isBrowser ? localStorage.getItem("theme") : null;
  const storedColor = isBrowser ? localStorage.getItem("setColor") : "#e85444";

  const [theme, setTheme] = useState<string | null>(storedTheme);
  const [color, setColor] = useState<string | null>(storedColor);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean | null>(false);

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
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isSideBarOpen,
        setIsSideBarOpen,
        color,
        setColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the app context
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
