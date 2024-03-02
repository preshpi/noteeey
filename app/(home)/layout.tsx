"use client";
import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full h-[100svh]">
      <Sidebar />
      {children}
    </main>
  );
};

export default Layout;
