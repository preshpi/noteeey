import { FeedbackModalProps } from "@/app/types/components/Modals/FeedbackModal";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import Overlay from "../Overlay";
import { MdClose } from "react-icons/md";
import { Toaster, toast } from "sonner";
import emailjs from "@emailjs/browser";

const FeedbackModal: NextPage<FeedbackModalProps> = ({ show, setShow }) => {
  const [isRequestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState<{ message: string }>({
    message: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const cancelModal = () => {
    setShow(false);
  };

  const handleSendFeedback = (e: any) => {
    e.preventDefault();

    if (!formData.message) {
      toast.error("Field shouldn't be empty!");
    } else {
      const formElement = formRef.current;

      if (formElement) {
        emailjs
          .sendForm(
            "service_aakyhrk",
            "template_p5ls11n",
            formElement,
            process.env.NEXT_PUBLIC_EMAIL_API_KEY,
          )
          .then(
            (result) => {
              toast.success(result.text);
              setRequestSent(true);
            },
            (error) => {
              toast.error(error.text);
            }
          );
      } else {
        console.error("Form element is not available.");
      }
    }
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
            <form
              ref={formRef}
              onSubmit={handleSendFeedback}
              className="flex flex-col gap-5 pt-5"
            >
              <textarea
                value={formData.message}
                name="message"
                id="message"
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  });
                }}
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
                <button
                  type="submit"
                  disabled={isRequestSent}
                  className="px-4 py-2 rounded-lg bg-white text-black hover:opacity-70 transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster richColors />
    </Overlay>
  );
};

export default FeedbackModal;
