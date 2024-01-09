"use client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { CreateModalProps } from "../../types/components";
import Overlay from "../Overlay";
import Input from "../Input";
import { toast } from "sonner";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppContext } from "@/app/context/AppContext";
import useModalAnimation from "./useModalAnimation";

export interface formData {
  title: string;
}

const CreateNoteModal: NextPage<CreateModalProps> = ({
  show,
  setShow,
  content,
  buttonContent,
  addNewNote,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputData, setInputData] = useState<formData>({ title: "" });
  const [user] = useAuthState(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputData({ title: event.target.value });
  };

  useModalAnimation(modalRef);

  const formValidation = () => {
    const words = inputData.title.trim().split(/\s+/);

    if (inputData.title.trim() === "") {
      toast.error("Please enter a title.");
      return false;
    }

    if (words.length > 3) {
      toast.error("Please enter less than three words!");
      return false;
    }

    return true;
  };

  const handleCreateNoteey = async () => {
    if (!formValidation() || !user) {
      return;
    }

    if (user) {
      const userDocRef = doc(db, "user", user?.uid); // Reference to the user document
      const noteCollectionRef = collection(userDocRef, "note"); // Reference to the "note" subcollection
      try {
        const newNoteData = {
          title: inputData.title,
          timestamp: serverTimestamp(),
        };
        const newNoteDocRef = await addDoc(noteCollectionRef, newNoteData);
        const newNote = { id: newNoteDocRef.id, ...newNoteData };
        addNewNote(newNote);
        setShow(false);
      } catch (error) {
        toast.error("Error adding note to user document");
      }
    }
  };

  const cancelModal = () => {
    setShow(false);
  };

  const { color } = useAppContext();
  const backgroundStyle = color ? { backgroundColor: color } : {};

  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div
          ref={modalRef}
          id="createModal"
          className="m-10 max-w-[405px] p-6 flex h-fit w-full flex-col items-center rounded-[10px] bg-white dark:bg-[#232323] gap-3"
        >
          <p className="text-center text-lg text-text dark:text-[#FFFFFF]">
            {content}
          </p>
          <form action="" className="w-full">
            <Input
              name="createNote"
              id="createNote"
              value={inputData.title}
              autoComplete="off"
              required
              onChange={handleInputChange}
              type="text"
              additionalClasses="border w-full outline-none focus-none bg-transparent dark:border-[#3D3D3D] border-[#C2C2C2] dark:text-[#FFFFFF] p-2 rounded text-black text-sm dark:placeholder-[#777777]"
              placeholder="Enter note title"
            />
          </form>
          {buttonContent && (
            <div className="flex w-full py-2 gap-4">
              <button
                className="w-full py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] dark:hover:bg-[#1d1d1d] hover:text-black border dark:border-[#3D3D3D] border-[#C2C2C2] dark:text-[#CCCCCC]"
                onClick={cancelModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded-lg hover:opacity-90 transition-all duration-300  px-4 py-2 text-sm text-text"
                style={backgroundStyle}
                onClick={handleCreateNoteey}
              >
                {buttonContent}
              </button>
            </div>
          )}
        </div>
      )}
    </Overlay>
  );
};

export default CreateNoteModal;
