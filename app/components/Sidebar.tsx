"use client";
import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { PiNotebookLight } from "react-icons/pi";
import FeedbackModal from "./Modals/FeedbackModal";
import { useAppContext } from "../context/AppContext";
import { HiChevronUpDown } from "react-icons/hi2";
import SettingsModal from "./Modals/SettingsModal";
import { VscFeedback } from "react-icons/vsc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import useModalAnimation from "./Modals/useModalAnimation";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [feedback, setFeedback] = useState<boolean>(false);
  const [settingsModal, SetSettingsModal] = useState<boolean>(false);
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const [user] = useAuthState(auth);
  const animateCom = useRef(null);
  useModalAnimation(animateCom);
  const pathname = usePathname();

  return (
    <>
      {isSideBarOpen && (
        <>
          <aside
            id="sidebar"
            ref={animateCom}
            className="sticky top-0 z-20 flex flex-col h-[100vh] w-full max-w-[220px] text-white dark:bg-[#131313] bg-[#F7F7F7]"
          >
            <div className="w-full h-full">
              <div className="flex justify-between flex-col h-full p-4">
                {/* first div */}
                <div>
                  <div className="w-full flex justify-between items-center">
                    <Link
                      href="/"
                      className="font-bold hover:opacity-80 text-[25px] dark:text-[#FBFBFB] text-[#131313]"
                    >
                      Noteey
                    </Link>
                    <div className="flex items-center hover:bg-opacity-50 w-8 h-8 justify-center">
                      <button
                        onClick={() => setIsSideBarOpen(false)}
                        className="bg-[#222] w-full h-full text-[24px] text-white duration-200 transition-all rounded-md flex items-center justify-center"
                      >
                        <MdClose />
                      </button>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <li>
                      <Link href="/notes">
                        <button
                          className={`p-2 dark:text-slate-50 text-[#131313] text-x dark:hover:bg-[#222] hover:bg-[#EAEAEA] rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center ${
                            pathname === "/notes"
                              ? "dark:bg-[#323135] bg-[#EAEAEA]"
                              : "bg-none"
                          }`}
                        >
                          {" "}
                          <PiNotebookLight /> Notes
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/trash">
                        <button
                          className={`p-2 dark:text-slate-50 text-[#131313] text-x dark:hover:bg-[#222] hover:bg-[#EAEAEA] rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center ${
                            pathname === "/trash"
                              ? "dark:bg-[#323135] bg-[#EAEAEA]"
                              : "bg-none"
                          }`}
                        >
                          {" "}
                          <AiOutlineDelete /> Trash
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link href="/settings">
                        <button
                          className={`p-2 dark:text-slate-50 text-[#131313] text-x dark:hover:bg-[#222] hover:bg-[#EAEAEA] rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center ${
                            pathname === "/settings"
                              ? "dark:bg-[#323135] bg-[#EAEAEA]"
                              : "bg-none"
                          }`}
                        >
                          {" "}
                          <IoSettingsOutline /> Settings
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* second div */}
                <div className="space-y-5 relative">
                  <button
                    onClick={() => setFeedback(!feedback)}
                    className="p-2 dark:bg-[#222] bg-[#EAEAEA] dark:text-slate-50 text-[#131313] text-[0.8em] md:text-[1em] hover:opacity-90 rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center"
                  >
                    <VscFeedback />
                    Send Feedback
                  </button>
                  <div className="">{settingsModal && <SettingsModal />}</div>
                  <button
                    onClick={() => SetSettingsModal(!settingsModal)}
                    className="flex p-3 dark:bg-[#222] bg-[#EAEAEA] rounded-lg justify-between items-center text-[0.8em] md:text-[1em] dark:text-slate-50 text-[#131313] hover:opacity-90 text-[14px] w-full"
                  >
                    {user && (
                      <>
                        <p className="text-[1.2em] md:hidden">
                          {user?.displayName
                            ?.split(" ")
                            .map((word, index, array) => (
                              <span key={index}>
                                {index === 0
                                  ? word
                                  : ` ${word.charAt(0).toUpperCase()}`}
                              </span>
                            ))}
                        </p>
                        <p className="hidden md:block text-x">
                          {user?.displayName}
                        </p>
                      </>
                    )}

                    <HiChevronUpDown />
                  </button>
                </div>
              </div>
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
