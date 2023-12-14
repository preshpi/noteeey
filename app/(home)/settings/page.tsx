"use client";
import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoute";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { setUser } from "../../userSlice";
import { toast } from "sonner";
import img from "../../assets/defaultProfile.jpeg";
import { IoArrowBack } from "react-icons/io5";
import DarkModeTheme from "../../components/DarkModeTheme";
import TopBar from "@/app/components/TopBar";
const Settings = () => {
  const [user, loading] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleProfileModal = () => {
    setShow(!show);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute>
      <section className="w-full">
        <div className="flex items-center justify-start px-5 gap-5 dark:text-white text-text mt-3">
          <div
            onClick={goBack}
            className="cursor-pointer text-3xl hover:animate-pulse"
          >
            <IoArrowBack />
          </div>
          <h3 className="text-[30px] font-semibold">Settings</h3>
        </div>

        <div className="max-w-[1000px] mx-auto mt-8 p-5">
          <section className="rounded-[20px] dark:bg-slate-900 bg-slate-100 w-full p-5 h-full shadow-lg">
            <h1 className="font-semibold dark:text-[#fff] text-text text-[24px]">
              General
            </h1>

            <div className="flex items-center justify-between">
              <h3 className="text-[18px] dark:text-[#fff] text-text">
                Theme Preferences
              </h3>
              <DarkModeTheme />
            </div>

            <div className="flex items-center justify-between pt-5">
              <h3 className="text-[18px] dark:text-[#fff] text-text">
                Note Display Preferences
              </h3>
              <div className="flex flex-col items-start dark:text-[#fff] text-text gap-5 px-12">
                <p>Card color</p>
                <div className="flex flex-wrap gap-3">
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[#c84b4b]"></button>
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[green]"></button>
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[pink]"></button>
                  <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:opacity-70 duration-300 transistion-all bg-[pink]"></button>
                </div>
                <p>Grid view</p>
                <div></div>
                <p>List view</p>
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Settings;
