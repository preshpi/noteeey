import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const TopBar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  return (
    <header className="flex items-center justify-between w-full p-4 text-[#180202] dark:text-[#effefb]">
      {!isSideBarOpen && (
        <div className="w-8 h-8 flex items-center justify-center">
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="flex items-center justify-center hover:bg-opacity-50 bg-black text-white rounded-md w-full h-full"
          >
            <FiMenu />
          </button>
        </div>
      )}
    </header>
  );
};

export default TopBar;
