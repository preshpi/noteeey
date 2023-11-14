"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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
    if (user) {
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
    <div className="bg-[#0a0815] flex flex-col h-screen">
      <Navbar signIn={handleGoogleSignIn} logOut={handleLogout} />

      <section className="items-center h-full  justify-center flex px-5 flex-col">
        <h1 className="text-[#FAF8FC] lg:text-[80px] md:text-[56px] text-[50px] font-bold text-center">
          Organize Your Ideas with Sticky Notes{" "}
          <span className="text-[#e85444]">Online</span>
        </h1>
        <p className="mt-5 text-gray-50 font-[300] text-center text-[17px] lg:text-[20px]">
          Noteey is an online tool for taking notes. You can create, edit,
          delete and share notes.
        </p>

        <Button
          onClick={handleCreateNote}
          additionalClasses="mt-12 text-slate-50 bg-[#e85444] px-10 py-3 rounded-2xl animate-pulse ring-8 ring-[#f6695a]"
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
