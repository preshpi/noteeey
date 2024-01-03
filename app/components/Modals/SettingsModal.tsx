import { auth } from "@/app/firebase";
import { setUser } from "@/app/userSlice";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import useModalAnimation from "./useModalAnimation";

const SettingsModal = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAnimation(modalRef);

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
    <div
      ref={modalRef}
      id="settingsModal"
      className="bg-[#1d1d1d] text-white rounded-lg bottom-14 space-y-3 w-full p-2 absolute"
    >
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

      <p
        onClick={handleLogout}
        className="cursor-pointer text-x rounded-lg w-full flex items-center gap-5 p-1 transition-all duration-300 hover:bg-[#3e3e3e] "
      >
        <CiLogout /> Logout
      </p>
    </div>
  );
};

export default SettingsModal;
