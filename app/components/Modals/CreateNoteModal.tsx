"use client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { CreateModalProps } from "../../types/components";
import Overlay from "../Overlay";
import Input from "../Input";
import { toast } from "sonner";
import { addDoc, collection, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

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
  const user = useSelector((state: RootState) => state.user.user);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputData({ title: event.target.value });
  };

  
  const formValidation = () => {
    if (!inputData.title) {
      return false;
    }
    return true;
  };

 

  const handleCreateNoteey = async () => {
    if (!formValidation()) {
      toast.error("Please enter a title.");
    } else {
      const userDocRef = doc(db, "user", user?.uid); // Reference to the user document
      const noteCollectionRef = collection(userDocRef, "note"); // Reference to the "note" subcollection
      try {
        const newNoteData = {
          title: inputData.title,
          timestamp: serverTimestamp(),
        };
        const newNoteDocRef = await addDoc(noteCollectionRef, newNoteData);

        // Get the ID of the newly created note
        const newNote = { id: newNoteDocRef.id, ...newNoteData };

        // Pass the new note to the parent component to add it to the state
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
  
  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div
          ref={modalRef}
          className="m-10 max-w-[405px] p-6 flex h-fit w-full flex-col items-center rounded-[10px] bg-white gap-3"
        >
          <p className="text-center text-lg text-[#221b3a] font-mono">
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
              additionalClasses="border w-full outline-none focus-none p-2 rounded text-black text-sm"
              placeholder="What's the title of your note?"
            />
          </form>
          <p className="uppercase font-semibold">{inputData.title}</p>
          {buttonContent && (
            <div className="flex w-full py-2 gap-4">
              <button
                className="w-full rounded-md bg-[#e85444] py-2 text-sm text-white"
                onClick={handleCreateNoteey}
              >
                {buttonContent}
              </button>
              <button
                className="w-full rounded-md transition-colors duration-300 hover:bg-[#e85444] py-2 text-sm text-black hover:text-white border"
                onClick={cancelModal}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </Overlay>
  );
};

export default CreateNoteModal;
