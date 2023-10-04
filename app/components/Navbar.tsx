import { NextPage } from "next";
import React from "react";
import Button from "./Button";

const Navbar: NextPage = () => {
  return (
    <div className="flex justify-between items-center px-6 py-6 border-b">
      <div>
        <h1 className="text-[#effefb] text-2xl cursor-pointer">
          Noteey
        </h1>
      </div>

      <div className="flex text-slate-50 items-center gap-3">
       <button className="px-6 py-2 ounded-lg hover:text-slate-100">Login</button>
       <button className="px-6 py-2 rounded-lg bg-[#221b3a] hover:bg-[#e85444] transition-colors duration-500"> Sign up</button>
      </div>
    </div>
  );
};

export default Navbar;
