import { Dispatch, SetStateAction } from "react";

export interface EditModalProps {
  show: boolean;
  content: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
}