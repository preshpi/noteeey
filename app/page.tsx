"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { setUser } from "./userSlice";
import { Toaster, toast } from "sonner";
import AuthCheckModal from "./components/Modals/AuthCheckModal";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const authenticatedUser = result.user;
      dispatch(setUser(authenticatedUser));
      const userRef = doc(db, "user", authenticatedUser.uid);
      const userSnapShot = await getDoc(userRef);

      if (!userSnapShot.exists()) {
        await setDoc(userRef, {
          displayName: authenticatedUser.displayName,
          email: authenticatedUser.email,
        });
      }
      toast.success("Logged in");
      router.push("/notes");
    } catch (error) {
      toast.error("Error signing in");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out:");
    }
  };

  const handleCreateNote = () => {
    if (user && !loading) {
      dispatch(setUser(user));
      router.push("/notes");
    } else {
      setShow(true);
    }
  };

  const closeModal = () => {
    handleGoogleSignIn();
    setShow(false);
  };
  return (
    <div className="flex flex-col h-screen">
      <Navbar signIn={handleGoogleSignIn} logOut={handleLogout} />

      <section className="items-center justify-center flex px-4 flex-col h-full space-y-5">
        <h1 className="dark:text-[#FAF8FC] text-text lg:text-[80px] md:text-[56px] text-[40px] font-bold text-center">
          Organize Your Ideas With Sticky Notes{" "}
          <span className="gradient">Online</span>
        </h1>
        <p className="dark:text-gray-50 text-text font-[300] text-center text-[19px] lg:text-[23px]">
          Noteey is an online tool for taking notes. You can create, edit,
          delete and share notes.
        </p>

        <Button
          onClick={handleCreateNote}
          disabled={loading}
          additionalClasses={`dark:text-white text-text dark:bg-[#d44141] bg-[#FF6D4C] px-12 py-3 rounded-2xl hover:opacity-75 transistion-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Create a note
        </Button>

        {show && (
          <AuthCheckModal
            show={show}
            content="You must be logged in to create a note"
            setShow={setShow}
            buttonContent="Log in"
            buttonAction={closeModal}
          />
        )}
        <Toaster richColors position="top-center" />
      </section>
    </div>
  );
};

export default Home;
