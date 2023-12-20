import { auth } from "@/app/firebase";
import { setUser } from "@/app/userSlice";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const SettingsModal = () => {
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
  return (
    <ul className="bg-[#1d1d1d] text-white rounded-lg bottom-14 space-y-3 w-full p-2 absolute">
      <Link href="/settings">
        <li className="flex items-center gap-5 cursor-pointer transition-all p-1 duration-300 hover:bg-[#3e3e3e] text-x rounded-lg w-full">
          <MdSettings />
          Settings
        </li>
      </Link>

      <button className="w-full">
        <a
          className="flex items-center gap-5 cursor-pointer transition-all p-1 duration-300 hover:bg-[#3e3e3e] text-x rounded-lg w-full"
          href="https://linktr.ee/preciousegwuenu"
          target="_blank"
        >
          {" "}
          <IoShareSocialOutline /> Socials
        </a>
      </button>

      <li onClick={handleLogout} className="cursor-pointer text-x rounded-lg w-full flex items-center gap-5 p-1 transition-all duration-300 hover:bg-[#3e3e3e] ">
        <CiLogout /> Logout
      </li>
    </ul>
  );
};

export default SettingsModal;
