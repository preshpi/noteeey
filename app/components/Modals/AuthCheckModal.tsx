import { NextPage } from "next";
import React, { useRef } from "react";
import { AuthModalProps } from "../../types/components";
import Overlay from "../Overlay";

const AuthCheckModal: NextPage<AuthModalProps> = ({
  show,
  setShow,
  content,
  buttonContent,
  buttonAction,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div
          ref={modalRef}
          className="m-10 flex h-fit w-[80%] max-w-[675px] flex-col items-center rounded-[10px] bg-white p-4  md:w-fit md:p-8"
        >
          <p className="text-center text-lg text-red-600">{content}</p>
          {buttonContent && (
            <div className="flex w-full py-4">
              <button
                className="w-full rounded-md bg-[#221b3a]  py-2 text-sm text-white"
                onClick={buttonAction}
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

export default AuthCheckModal;
