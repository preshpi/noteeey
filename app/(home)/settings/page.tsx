"use client";
import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { setUser } from "../../userSlice";
import { toast } from "sonner";
import { IoArrowBack } from "react-icons/io5";
import DarkModeTheme from "../../components/DarkModeTheme";
import ColorPicker from "@/app/components/ColorPicker";
import { useAppContext } from "@/app/context/AppContext";
import { FiMenu } from "react-icons/fi";

const Settings = () => {
  const [user, loading] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      router.push("/");
      setShow(false);
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute>
      <section className="w-full">
        <div className="flex items-center justify-start px-5 gap-5 dark:text-white text-text mt-3">
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

          <div className="flex flex-col gap-1 text-[#131313] dark:text-[#FFFFFF]">
            <h3 className="text-[20px] ">Settings</h3>
            <p className="text-[14px]">Manage account settings.</p>
          </div>
        </div>

        <div className="mt-8 p-5">
          <section className="flex flex-col gap-8">
            <div className="space-y-3">
              <p className="font-semibold dark:text-[#fff] text-text text-[16px]">
                General
              </p>
              <div className="flex justify-between">
                <p className="text-[14px] dark:text-[#fff] text-[#131313]">
                  Theme Preferences
                </p>
                <DarkModeTheme />
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-[14px] dark:text-[#fff] text-text">
                Note Display Preferences
              </p>

              <ColorPicker />
            </div>

            <div className="flex gap-3 flex-col w-[383px]">
              <p className="text-[16px] dark:text-[#fff] text-text">
                Confirm account deletion
              </p>
              <p className="text-[#131313] dark:text-[#ccc] text-[14px]">
                You&apos;ll have access to your Noteey account and be able to
                restore your account within the next 30 days.
              </p>
              <button className="w-full py-4 bg-[#CD4628] hover:opacity-75 duration-300 transition-all dark:text-white rounded-[6px] max-w-[171px]">
                Delete my account
              </button>
            </div>
          </section>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Settings;
