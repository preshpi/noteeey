"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!loading) {
        if (!user) {
          // Redirect to the home page if the user is not authenticated
          router.push("/");
        }
      }
    };

    checkAuthentication();
  }, [loading, user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
