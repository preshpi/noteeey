import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import img from "../assets/defaultProfile.jpeg";
import { signOut } from "firebase/auth";
import { setUser } from "../userSlice";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

const TopBar = () => {
  const [user, loading] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out using Firebase Authentication
      dispatch(setUser(null)); // Clear the user from the Redux store
      router.push("/");
      setShow(false);
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleProfileModal = () => {
    setShow(!show);
  };
  return (
    <header className="flex items-center justify-between w-full p-3 border-b text-[#180202] dark:text-[#effefb]">
      <div className="flex flex-col">
        <p className="text-[30px] font-semibold">Hello, {user?.displayName}</p>
      </div>
      <button
        onClick={handleProfileModal}
        className="relative w-10 h-10 cursor-pointer"
      >
        <Image
          src={user?.photoURL || img}
          alt="profile image"
          className="object-over rounded-full  hover:opacity-70 transition-all duration-300"
          width={50}
          height={50}
        />
        {show && (
          <div className="absolute left-[-60px] top-12">
            <button
              onClick={handleLogout}
              className="rounded-md lg:py-3 py-2 cursor-pointer text-base dark:text-black bg-[#e6e4e4] hover:text-white  hover:bg-[#D12600] lg:w-24 w-20 transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </button>
    </header>
  );
};

export default TopBar;
