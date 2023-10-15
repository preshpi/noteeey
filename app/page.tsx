"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useRouter } from "next/navigation";
import Modal from "./components/Modal";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./userSlice";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the Redux store
        dispatch(setUser(user));
      } else {
        // User is signed out, clear the user data in the Redux store
        dispatch(setUser(null));
      }
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const authenticatedUser = result.user;
      dispatch(setUser(authenticatedUser));

      // Now you can work with the authenticated user object
      toast.success("Logged in");
    } catch (error) {
      // Handle sign-in errors here
      toast.error("Error signing in");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out using Firebase Authentication
      dispatch(setUser(null)); // Clear the user from the Redux store
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out:");
    }
  };

  const handleCreateNote = () => {
    if (user) {
      // User is logged in, navigate to the notes page
      router.push("/notes");
    } else {
      setShow(true);
    }
  };

  const closeModal = () => {
    handleGoogleSignIn()
    setShow(false);
  };
  return (
    <div className="bg-[#0a0815] min-h-screen">
      <Navbar signIn={handleGoogleSignIn} logOut={handleLogout}/>

      <section className="items-center justify-center flex mt-16 px-5 flex-col">
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
          <Modal
            show={show}
            content="You must be logged in to create a note"
            setShow={setShow}
            buttonContent="Log in"
            buttonAction={closeModal}
          />
        )}
        <Toaster position="top-center"/>
      </section>
    </div>
  );
};

export default Home;
