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
    <header className="flex items-center justify-between w-full py-5 px-12 text-[#180202] dark:text-[#effefb]">
      <Link href="/">
        <span className="lg:text-2xl text-xl font-bold">Noteey</span>
      </Link>

      <div className="flex items-center gap-5 justify-center">
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
            <div className="absolute left-[-30px] top-12">
              <button
                onClick={handleLogout}
                className="rounded-md lg:py-3 py-2 cursor-pointer text-base bg-[#e6e4e4] hover:text-white  hover:bg-[#D12600] lg:w-24 w-20 transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          )}
        </button>
        <Link href="/settings">
          <div className="w-10 h-10 text-[#e85444] flex items-center justify-center cursor-pointer hover:opacity-70 duration-300 transition-all">
            <IoMdSettings className="w-full h-full" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
