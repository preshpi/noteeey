"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { PiNoteThin } from "react-icons/pi";
import FeedbackModal from "./Modals/FeedbackModal";
import { useAppContext } from "../context/AppContext";
import { HiChevronUpDown } from "react-icons/hi2";
import SettingsModal from "./Modals/SettingsModal";
import { VscFeedback } from "react-icons/vsc";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Sidebar = () => {
  const [feedback, setFeedback] = useState<boolean>(false);
  const [settingsModal, SetSettingsModal] = useState<boolean>(false);
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {isSideBarOpen && (
        <>
          <aside className="sticky top-0 z-20 flex flex-col h-[100vh] w-full max-w-[240px] text-white bg-black">
            <div className="w-full h-full">
              <div className="flex justify-between flex-col h-full p-4">
                <div>
                  <div className="w-full flex justify-between items-center">
                    <Link
                      href="/"
                      className="font-bold hover:opacity-80 text-[25px]"
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
                  <Link href="/notes">
                    <button className="p-2 bg-[#222] mt-8 text-slate-50 text-x hover:opacity-90 rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center">
                      {" "}
                      <PiNoteThin /> Notes
                    </button>
                  </Link>
                </div>
                {/* second div */}
                <div className="space-y-5 relative">
                  <button
                    onClick={() => setFeedback(!feedback)}
                    className="p-2 bg-[#222] text-slate-50 text-x hover:opacity-90 rounded-lg w-full border-1 duration-300 transition-colors flex gap-5 items-center"
                  >
                    <VscFeedback />
                    Send Feedback
                  </button>
                  <div className="">{settingsModal && <SettingsModal />}</div>
                  <button
                    onClick={() => SetSettingsModal(!settingsModal)}
                    className="flex p-2 bg-[#222] rounded-lg justify-between items-center text-slate-50 hover:opacity-90 text-x w-full"
                  >
                    {user && (
                      <p className="text-x">
                        {user?.displayName}
                      </p>
                    )}{" "}
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
