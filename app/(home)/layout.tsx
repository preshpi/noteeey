"use client";
import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full h-full">
      <Sidebar />
      {children}
    </main>
  );
};

export default Layout;
