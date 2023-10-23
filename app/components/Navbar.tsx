"use client";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FiLogOut } from "react-icons/fi";

export interface navbarProps {
  signIn: () => void;
  logOut: () => void;
}
const Navbar: NextPage<navbarProps> = ({ signIn, logOut }) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex justify-between items-center px-6 py-6 border-b">
      <div>
        <h1 className="text-[#effefb] text-2xl cursor-pointer">Noteey</h1>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {user.displayName && ( // Check if displayName exists
              <p className="text-slate-50">Welcome, {user.displayName}</p>
            )}{" "}
            <button
              onClick={logOut}
              className="px-6 py-2 lg:block hidden rounded-lg bg-[#ff0000] text-slate-50 hover:bg-[#e85444] transition-colors duration-500"
            >
              Logout
            </button>
            <button onClick={logOut}
              className="lg:hidden block px-2 py-2 rounded-md bg-[#e85444] hover:bg-[#ff0000] text-slate-50 transition-colors duration-500">
                <FiLogOut />
              </button>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="px-6 py-2 rounded-lg bg-[#221b3a] text-slate-50 hover:bg-[#e85444] transition-colors duration-500"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
