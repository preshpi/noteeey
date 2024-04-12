"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signOut, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { setUser } from "./userSlice";
import { Toaster, toast } from "sonner";
import AuthCheckModal from "./components/Modals/AuthCheckModal";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [hasVisitedLandingPage, setHasVisitedLandingPage] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithRedirect(auth, provider);
      setHasVisitedLandingPage(true);
    } catch (error) {
      toast.error("Error signing in");
    }
  };

  useEffect(() => {
    const handleSignIn = async () => {
      if (user && !loading) {
        dispatch(setUser(user));
        const userRef = doc(db, "user", user.uid);
        const userSnapShot = await getDoc(userRef);

        if (!userSnapShot.exists()) {
          await setDoc(userRef, {
            displayName: user.displayName,
            email: user.email,
            hasVisitedLandingPage: false,
          });
        } else {
          const userData = userSnapShot.data();
          if (userData && !userData.hasVisitedLandingPage) {
            await updateDoc(userRef, {
              hasVisitedLandingPage: true,
            });
            toast.success("Logged in");
            router.push("/notes");
          }
        }
      }
    };

    handleSignIn();
  }, [user, loading, dispatch, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out");
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
    <>
      <div className="flex flex-col h-screen hero-background dark:bg-[#131313]">
        <Navbar signIn={handleGoogleSignIn} logOut={handleLogout} />

        <section className="items-center justify-center flex px-4 flex-col h-full gap-y-6">
          <h1 className="dark:text-[#FAF8FC] text-text lg:text-[60px] md:text-[56px] leading-20 text-[40px] font-bold text-center max-w-[900px]">
            Organize Your Ideas With Notes{" "}
            <span className="gradient">Online</span>
          </h1>
          <p className="dark:text-gray-50 italic max-w-[600px] text-text font-[300] text-center text-[19px] lg:text-[23px]">
            Noteeey is an online tool for taking notes.
            <br /> You can create, edit, delete and share notes.
          </p>

          <Button
            onClick={handleCreateNote}
            disabled={loading}
            additionalClasses={`herobutton ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            // additionalClasses={`dark:text-white text-text dark:bg-[#d44141] herobutton bg-[#FF6D4C] px-12 py-3 rounded-2xl hover:opacity-75 transistion-all duration-300 ${
            //   loading ? "opacity-50 cursor-not-allowed" : ""
            // }`}
          >
            <span> Create a note</span>
          </Button>
        </section>
      </div>{" "}
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
    </>
  );
};

export default Home;
