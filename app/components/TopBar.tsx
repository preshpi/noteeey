import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const TopBar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const [user, loading] = useAuthState(auth);
  return (
    <header className="flex items-center gap-5 w-full p-4 text-[#180202] dark:text-[#effefb]">
      {!isSideBarOpen && (
        <div className="w-8 h-8 flex items-center justify-center">
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="flex items-center justify-center hover:bg-opacity-50 bg-[#131313] text-white rounded-md w-full h-full"
          >
            <FiMenu />
          </button>
        </div>
      )}
      {user && !loading && (
        <div>
          <p className="text-[20px] font-[500] dark:text-[#FFFFFF] text-[#131313]">
            Hello, {user?.displayName}
          </p>
          <p className="text-[14px] dark:text-[#BBBBBB] text-[#131313]">
            What are you writing today?
          </p>
        </div>
      )}
    </header>
  );
};

export default TopBar;
