import { FeedbackModalProps } from "@/app/types/components/Modals/FeedbackModal";
import { NextPage } from "next";
import React, { useRef } from "react";
import Overlay from "../Overlay";
import { MdClose } from "react-icons/md";

const FeedbackModal: NextPage<FeedbackModalProps> = ({ show, setShow }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelModal = () => {
    setShow(false);
  };
  return (
    <Overlay show={show} setShow={setShow} modalRef={modalRef}>
      {show && (
        <div className="max-w-[512px] w-full bg-black bg-opacity-90 rounded-lg shadow h-auto max-h-[500px] overflow-auto">
          <div className="p-5 text-[#eee]">
            <div className="flex justify-between items-center text-2xl">
              <p className="font-semibold tracking-tight">Send us a feedback</p>
              <button onClick={cancelModal}>
                <MdClose />
              </button>
            </div>

            <p className="text-x pt-3 text-[#eee]">
              Bugs? Honest feedback would be apperciated. You can also send new
              features you want us to add.
            </p>
            <form className="flex flex-col gap-5 pt-5">
              <textarea
                className="p-4 text-sm h-32 rounded-lg border focus:outline-none bg-black text-[#eee] border-slate-200"
                placeholder="Let us know the issue..."
              ></textarea>
              <div className="flex justify-end gap-5">
                <button
                  onClick={cancelModal}
                  className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#b6b5b5] hover:text-black"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-white text-black hover:opacity-70 transition-all duration-300">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default FeedbackModal;
