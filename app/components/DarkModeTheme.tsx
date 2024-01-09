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
    <div className="flex items-center justify-center flex-col gap-3">
      <p className="text-[#131313] dark:text-[#FFFF] text-[14px]">
        Select your favorite theme
      </p>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-3">
          {" "}
          <button
            onClick={handleThemeSwitch}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all border border-[#3D3D3D] bg-[#fff] ${
              theme === "light" ? "border border-[#3D3D3D]" : ""
            }`}
          >
            {theme === "light" && (
              <IoMdCheckmark className="text-2xl text-[#000]" />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleThemeSwitch}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[#1C1C1C] ${
              theme === "dark" ? "border border-[#3D3D3D]" : ""
            }`}
          >
            {mounted && theme === "dark" && (
              <IoMdCheckmark className="text-2xl text-[#fff]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkModeTheme;
