"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <main className="flex bg-[red] w-full items-center">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <button
        onClick={() => setSidebar(true)}
        className="cursor-pointer hover:bg-slate-50 opacity-50"
      >
        <FiMenu />
      </button>
      {children}
    </main>
  );
};

export default Layout;
