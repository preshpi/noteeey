"use client";
import React, { useState } from "react";
import { MdClose, MdSettings } from "react-icons/md";
import { SidebarProps } from "../types/components";
import { NextPage } from "next";
import Link from "next/link";
import { PiNoteThin } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
const Sidebar: NextPage<SidebarProps> = ({ sidebar, setSidebar }) => {
  return (
    <>
      {sidebar && (
        <aside className="sticky top-0 z-20 flex flex-col h-[100vh] w-full max-w-[240px] text-white bg-black">
          <button
            onClick={() => setSidebar(false)}
            className="cursor-pointer lg:hidden rounded-full p-2 text-xl text-white duration-200 hover:bg-opacity-30"
          >
            <MdClose />
          </button>
          <div className="w-full p-4 h-full">
            <Link href="/" className="w-full">
              <span className="text-[30px] font-bold">Noteey</span>
            </Link>

            <ul className="mt-12 flex flex-col gap-6">
              <Link href="/notes">
                <li className="flex items-center gap-5 cursor-pointer hover:bg-black transition-all duration-300 hover:opacity-70 text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                  {" "}
                  <PiNoteThin /> Notes
                </li>
              </Link>

              <Link href="/settings">
                <li className="flex items-center gap-5 cursor-pointer hover:bg-black transition-all duration-300 hover:opacity-70 text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                  {" "}
                  <MdSettings />
                  Settings
                </li>
              </Link>

              <li className="flex items-center gap-5 cursor-pointer text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                <VscFeedback /> Feedbacks
              </li>
              <li className="flex items-center gap-5 cursor-pointer text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                <IoShareSocialOutline /> Socials
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
