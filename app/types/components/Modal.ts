import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  show: boolean;
  content: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
}
