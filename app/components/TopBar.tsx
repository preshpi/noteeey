import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const { isSideBarOpen, setIsSideBarOpen, color, setCreateNote } =
    useAppContext();
  const [user, loading] = useAuthState(auth);
  const background = color || "#e85444";
  const bg = { backgroundColor: background };
  const router = useRouter();
  const pathname = usePathname();

  const checkingRoute = pathname !== "/notes";

  const handleCreateModal = () => {
    if (checkingRoute) {
      router.push("/notes");
      setCreateNote(true);
    } else {
      setCreateNote(true);
    }
  };

  return (
    <header className="flex items-between w-full items-center p-4 text-[#180202] dark:text-[#effefb]">
      <div className="flex items-center gap-5 w-full">
        {!isSideBarOpen && (
          <div className="w-8 h-8 flex items-center justify-center group">
            <button
              onClick={() => setIsSideBarOpen(true)}
              className="flex items-center justify-center hover:bg-opacity-75 bg-[#131313] text-white rounded-md w-full h-full"
            >
              <FiMenu />
            </button>
            <div
              style={bg}
              className="absolute text-white px-5 left-[10px] py-2 rounded-md invisible group-hover:visible transistion-all duration-300 mt-24 text-[10px]"
            >
              <div
                className="w-3 h-3 -mt-2.5 absolute rotate-45"
                style={bg}
              ></div>
              <p className="w-full">open sidebar</p>
            </div>{" "}
          </div>
        )}
        {user && !loading && (
          <div>
            <p className="text-[20px] font-[500] dark:text-[#FFFFFF] text-[#131313]">
              Hello, {user?.displayName}
            </p>
            <p className="text-[14px] dark:text-[#BBBBBB] text-[#131313]">
              What are you writing today?
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleCreateModal}
        className="flex items-center justify-center hover:bg-opacity-75 bg-[#2A2A2A] text-white rounded-md w-12 h-10"
      >
        <FiEdit />
      </button>
    </header>
  );
};

export default TopBar;
