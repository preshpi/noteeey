"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full h-[100svh]">
      <Sidebar />
      {children}

      <Toaster richColors position="top-center" />
    </main>
  );
};

export default Layout;
