import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import img from "../assets/defaultProfile.jpeg";
import { signOut } from "firebase/auth";
import { setUser } from "../userSlice";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
// import toast, { Toaster } from "sonner";
import { Toaster, toast } from "sonner";
const TopBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
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
    <div className="flex items-center justify-between w-full py-6 px-6">
      <Link href="/">
        <span className="lg:text-2xl text-xl font-bold text-[#e6e4e4]">
          Noteey
        </span>
      </Link>

      <div>
        <div
          onClick={handleProfileModal}

          className="rounded w-10 h-10 items-center justify-center flex cursor-pointer hover:opacity-80 transition-all duration-300 mb-2"
        >
          <Image
            src={user?.photoURL || img}
            alt="profile image"
            className="object-over rounded-full"
            width={50}
            height={50}
          />
        </div>
        {show && (
          <div className="relative rounded-md shadow right-[50px]">
            {/* <p className="text-base w-32 py-3 rounded-md px-2 hover:bg-[#c8c7c7] transition-colors duration-300">
            {user?.displayName}
          </p> */}
            <button
              onClick={handleLogout}
              className="absolute transition-all rounded-md py-3 cursor-pointer text-base bg-[#e6e4e4] hover:text-white duration-300 hover:bg-[#ff0000] w-24"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <Toaster  position="top-center"/>
    </div>
  );
};

export default TopBar;
