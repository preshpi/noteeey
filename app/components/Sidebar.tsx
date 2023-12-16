"use client";
import React, { useState } from "react";
import { MdClose, MdSettings } from "react-icons/md";
import Link from "next/link";
import { PiNoteThin } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import FeedbackModal from "./Modals/FeedbackModal";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const [feedback, setFeedback] = useState<boolean>(false);
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();

  const handleFeedbackPopup = () => {
    setFeedback(true);
  };
  return (
    <>
      {isSideBarOpen && (
        <>
          <aside className="sticky top-0 z-20 flex flex-col h-[100vh] w-full max-w-[240px] text-white bg-black">
            <div className="w-full p-4 h-full">
              <div className="w-full flex justify-between items-center ">
                <div className="flex items-center lg:hidden hover:bg-opacity-50 w-8 h-8 justify-center">
                  <button
                    onClick={() => setIsSideBarOpen(false)}
                    className="bg-[#222] w-full h-full text-[24px] text-white duration-200 transition-all rounded-md flex items-center justify-center"
                  >
                    <MdClose />
                  </button>
                </div>
                <Link
                  href="/"
                  className="font-bold hover:opacity-80 text-[25px]"
                >
                  Noteey
                </Link>
              </div>

              <ul className="mt-8 flex flex-col gap-6">
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

                <li className="cursor-pointer text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                  <button
                    className="flex items-center gap-5 w-full h-full"
                    onClick={handleFeedbackPopup}
                  >
                    <VscFeedback /> Feedbacks
                  </button>
                </li>

                <li className="cursor-pointer text-x bg-[#3e3e3e] p-3 rounded-lg w-full">
                  <a
                    className="flex items-center gap-5"
                    href="https://linktr.ee/preciousegwuenu"
                    target="_blank"
                  >
                    {" "}
                    <IoShareSocialOutline /> Socials
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div>
            {feedback && (
              <FeedbackModal setShow={setFeedback} show={feedback} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
