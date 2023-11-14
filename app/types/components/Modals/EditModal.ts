import { Dispatch, SetStateAction } from "react";

export interface EditModalProps {
  show: boolean;
  header: string;
  content: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
}