import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-full py-6 px-6">
      <Link href="/">
        <span className="lg:text-2xl text-xl font-bold text-[#e6e4e4]">
          Noteey
        </span>
      </Link>

      <div className="group relative">
        <div className="rounded bg-[#e85444] w-10 h-10 items-center justify-center flex cursor-pointer hover:opacity-80 transition-all duration-300">
          <span className="font-semibold">P</span>
        </div>
        <div className="group-hover:block hidden absolute bg-[#e6e4e4] right-1 rounded-md">
          <p className="hover:opacity-50 cursor-pointer px-2 py-2">Preshypie</p>
          <Link href="/">
            <p className="hover:opacity-50 cursor-pointer px-2 py-2">
              Sign Out
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
