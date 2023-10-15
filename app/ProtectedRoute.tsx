"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
