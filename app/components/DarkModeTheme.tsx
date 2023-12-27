"use client";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useAppContext } from "../context/AppContext";

const DarkModeTheme = () => {
  const { theme, setTheme } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-3">
        <p className="dark:text-[#fff] text-text  text-[16px]">light mode</p>
        <button
          onClick={handleThemeSwitch}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[white]"
        >
          {theme === "light" && (
            <IoMdCheckmark className="text-2xl text-[#000]" />
          )}
        </button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="dark:text-[#fff] text-text text-[16px]">Dark mode</p>
        <button
          onClick={handleThemeSwitch}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[black]"
        >
          {mounted && theme === "dark" && (
            <IoMdCheckmark className="text-2xl text-[#fff]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DarkModeTheme;
