"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <main className="flex w-full">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      {!sidebar && (
        <div className="p-3">
          <button
            onClick={() => setSidebar(true)}
            className="cursor-pointer hover:bg-opacity-50 w-full bg-black text-white rounded-md p-3"
          >
            <FiMenu />
          </button>
        </div>
      )}
      {children}
    </main>
  );
};

export default Layout;
