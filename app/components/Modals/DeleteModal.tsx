import { NextPage } from "next";
import React, { useRef } from "react";
import Overlay from "../Overlay";
import { DeleteModalProps } from "@/app/types/components/Modals/DeleteModal";
import { useAppContext } from "@/app/context/AppContext";
import useModalAnimation from "./useModalAnimation";

const DeleteModal: NextPage<DeleteModalProps> = ({
  show,
  setShow,
  content,
  buttonContent,
  handleDeleteCard,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAnimation(modalRef);

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
          id="deleteModal"
          className="m-10 flex px-8 py-6 dark:text-[#FFFFFF] text-[#131313] flex-col items-center shadow gap-2 rounded-[10px] dark:bg-[#232323] bg-[#FFFFFF]"
        >
          <div className="w-full">
            <div className="text-center text-lg">
              <p>Are you sure you want to delete </p>
              <p>&apos;{content}&apos; ?</p>
            </div>

            {buttonContent && (
              <div className="flex py-4 gap-5 w-full">
                <button
                  className="w-full py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] dark:hover:bg-[#1d1d1d] border dark:border-[#3D3D3D] border-[#C2C2C2] dark:text-[#CCCCCC] hover:opacity-90"
                  onClick={cancelModal}
                >
                  Cancel
                </button>
                <button
                  className="w-full rounded-lg transition-all duration-300 hover:opacity-90 py-2 text-sm  bg-[#CD4628] text-[#FFFFFF]"
                  onClick={() => {
                    deleteCard(id);
                  }}
                >
                  {buttonContent}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default DeleteModal;
