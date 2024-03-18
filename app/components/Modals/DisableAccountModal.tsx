import { DeleteAccountModalProps } from "@/app/types/components";
import Overlay from "../Overlay";
import { NextPage } from "next";
import { useRef } from "react";
import useModalAnimation from "./useModalAnimation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DisableAccountModal: NextPage<DeleteAccountModalProps> = ({
  show,
  setShow,
  buttonContent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAnimation(modalRef);
  const router = useRouter();

  const [user] = useAuthState(auth);

  const disableAccount = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete your account?"
    );
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
              <p>Are you sure you want to disable your account?</p>
            </div>

            {buttonContent && (
              <div className="flex py-4 gap-5 w-full">
                <button
                  className="w-full py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] dark:hover:bg-[#1d1d1d] border dark:border-[#3D3D3D] border-[#C2C2C2] dark:text-[#CCCCCC] hover:opacity-90"
                  onClick={() => setShow(!show)}
                >
                  Cancel
                </button>
                <button
                  onClick={disableAccount}
                  className="w-full rounded-lg transition-all duration-300 hover:opacity-90 py-2 text-sm  bg-[#CD4628] text-[#FFFFFF]"
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

export default DisableAccountModal;
