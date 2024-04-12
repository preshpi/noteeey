"use client";
import { NextPage } from "next";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Image from "next/image";

export interface navbarProps {
  signIn: () => void;
  logOut: () => void;
}
const Navbar: NextPage<navbarProps> = ({ signIn, logOut }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="flex justify-between items-center lg:px-12 px-4 py-12 text-[#180202] dark:text-[#effefb]">
      <h1
        data-testid="logo"
        className="lg:text-3xl text-2xl cursor-pointer font-semibold"
      >
        Noteeey
      </h1>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {" "}
            {user.displayName && (
              <div>
                <p className="hidden md:block">
                  Welcome, {user.displayName} 👋
                </p>
                <Image
                  src={`https://ui-avatars.com/api/?name=${user.displayName}&rounded=true&size=128&background=FAF8FC`}
                  alt={user.displayName + "'s photo"}
                  width={30}
                  height={30}
                  className="object-cover rounded-[50%] w-[50px] h-[50px] md:hidden"
                />
              </div>
            )}
            <button
              onClick={logOut}
              className="px-6 py-2 lg:block hidden rounded-lg bg-[#e85444] text-white hover:bg-[#D12600] transition-colors duration-500"
            >
              Logout
            </button>
            <button
              onClick={logOut}
              className="lg:hidden block px-2 py-2 rounded-md bg-[#e85444] hover:bg-[#d44141] text-white transition-colors duration-500"
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={signIn}
              data-testid="cta-btn"
              className="px-6 py-2 rounded-lg backgroungradient text-slate-50 transition-colors duration-500"
            >
              Get Started
            </button>
            {loading && <div className="spinner"></div>}
          </div>
        )}
      </div>

      {error && <p>An error occurced, please try again. </p>}
    </div>
  );
};

export default Navbar;
