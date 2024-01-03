"use client";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { EditModalProps } from "../../types/components";
import Overlay from "../Overlay";
import Input from "../Input";
import { toast } from "sonner";
import { useAppContext } from "@/app/context/AppContext";
import useModalAnimation from "./useModalAnimation";

const EditModal: NextPage<EditModalProps> = ({
  show,
  setShow,
  header,
  buttonContent,
  handleUpdateDoc,
  content,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [newTitle, setNewTitle] = useState(content);
  const { color } = useAppContext();
  const backgroundStyle = color ? { backgroundColor: color } : {};

  useModalAnimation(modalRef);

  const formValidation = () => {
    const words = newTitle.trim().split(/\s+/);

    if (newTitle === "") {
      return false;
    }
    if (words.length > 3) {
      toast.error("Please enter less than three words!");
      return false;
    }
    return true;
  };

  const updateTitle = () => {
    if (!formValidation()) {
      return;
    } else {
      handleUpdateDoc(id, newTitle);
      setShow(false);
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
          id="editModal"
          className="m-10 max-w-[405px] p-6 flex h-fit w-full flex-col items-center rounded-[10px] bg-white gap-3"
        >
          <p className="text-center text-lg text-[#221b3a] font-mono">
            {header}
          </p>

          <form action="" className="w-full">
            <Input
              name="createNote"
              id="createNote"
              value={newTitle}
              autoComplete="off"
              required
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              additionalClasses="border w-full outline-none focus-none p-2 rounded text-black text-sm"
              placeholder="What's the title of your note?"
            />
          </form>
          {buttonContent && (
            <div className="flex w-full py-2 gap-4">
              <button
                className="w-full py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] hover:text-black border dark:text-text"
                onClick={cancelModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded-lg hover:opacity-90 transition-all duration-300  px-4 py-2 text-sm text-text"
                style={backgroundStyle}
                onClick={updateTitle}
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

export default EditModal;
