import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const TopBar = () => {
  const { isSideBarOpen, setIsSideBarOpen, color } = useAppContext();
  const [user, loading] = useAuthState(auth);
  const background = color || "#e85444";
  const bg = { backgroundColor: background };
  return (
    <header className="flex items-center gap-5 w-full p-4 text-[#180202] dark:text-[#effefb]">
      {!isSideBarOpen && (
        <div className="w-8 h-8 flex items-center justify-center group">
          <button
            onClick={() => setIsSideBarOpen(true)}
            className="flex items-center justify-center hover:bg-opacity-75 bg-[#131313] text-white rounded-md w-full h-full"
          >
            <FiMenu />
          </button>
          <div
            style={bg}
            className="absolute text-white px-5 left-[10px] py-2 rounded-md invisible group-hover:visible transistion-all duration-300 mt-24 text-[10px]"
          >
            <div
              className="w-3 h-3 -mt-2.5 absolute rotate-45"
              style={bg}
            ></div>
            <p className="w-full">open sidebar</p>
          </div>{" "}
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
