import { NextPage } from "next";
import React, { useRef } from "react";
import Overlay from "../Overlay";
import { DeleteModalProps } from "@/app/types/components/Modals/DeleteModal";

const DeleteModal: NextPage<DeleteModalProps> = ({
  show,
  setShow,
  content,
  buttonContent,
  handleDeleteCard,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
                className="w-full rounded-md bg-[#e85444]  py-2 text-sm text-white"
                onClick={() => {
                  deleteCard(id)
                }}
              >
                {buttonContent}
              </button>
              <button
                className="w-full rounded-md py-2 text-sm text-black border"
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

export default DeleteModal;
