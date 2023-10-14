import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import img from "../assets/defaultProfile.jpeg";
import { signOut } from "firebase/auth";
import { setUser } from "../userSlice";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out using Firebase Authentication
      dispatch(setUser(null)); // Clear the user from the Redux store
      router.push("/");
    } catch (error) {
      alert("Error signing out:");
    }
  };
  return (
    <div className="flex items-center justify-between w-full py-6 px-6">
      <Link href="/">
        <span className="lg:text-2xl text-xl font-bold text-[#e6e4e4]">
          Noteey
        </span>
      </Link>

      <div className="group relative">
        <div className="rounded w-10 h-10 items-center justify-center flex cursor-pointer hover:opacity-80 transition-all duration-300">
          <Image
            src={user?.photoURL || img}
            alt="profile image"
            className="object-over rounded-full"
            width={50}
            height={50}
          />
        </div>
        <div className="group-hover:block hidden absolute bg-[#e6e4e4] right-1 rounded-md shadow text-center">
          <p className="text-base w-32 py-3 rounded-md px-2 hover:bg-[#c8c7c7] transition-colors duration-300">
            {user?.displayName}
          </p>

          <button
            onClick={handleLogout}
            className="rounded-md py-3 cursor-pointer text-base transition-colors duration-300 hover:bg-[#e85444] w-32"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
