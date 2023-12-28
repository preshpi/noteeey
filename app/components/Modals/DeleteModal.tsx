import { NextPage } from "next";
import React, { useRef } from "react";
import Overlay from "../Overlay";
import { DeleteModalProps } from "@/app/types/components/Modals/DeleteModal";
import { useAppContext } from "@/app/context/AppContext";

const DeleteModal: NextPage<DeleteModalProps> = ({
  show,
  setShow,
  content,
  buttonContent,
  handleDeleteCard,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { color } = useAppContext();
  const backgroundStyle = color ? { backgroundColor: color } : {};

  const deleteCard = (id: string) => {
    handleDeleteCard(id);
    setShow(false);
  };
  const cancelModal = () => {
    setShow(false);
  };
  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div
          ref={modalRef}
          className="m-10 flex h-fit w-[80%] max-w-[675px] flex-col items-center rounded-[10px] bg-white p-4  md:w-fit md:p-8"
        >
          <p className="text-center text-lg text-black">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-600">{content}</span> ?
          </p>
          {buttonContent && (
            <div className="flex w-full py-4 gap-5">
              <button
                className="w-full py-2 rounded-lg transition-all duration-300 dark:hover:bg-[#eee] hover:text-black border dark:text-text"
                onClick={cancelModal}
              >
                Cancel
              </button>
              <button
                className="w-full rounded-lg transition-all duration-300 hover:opacity-90 py-2 text-sm text-text"
                style={backgroundStyle}
                onClick={() => {
                  deleteCard(id);
                }}
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

export default DeleteModal;
