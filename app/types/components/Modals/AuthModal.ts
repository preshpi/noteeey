import { Dispatch, SetStateAction } from "react";

export interface AuthModalProps {
  show: boolean;
  content: string;
  setShow: Dispatch<SetStateAction<boolean | null>>;
  buttonContent?: string;
  buttonAction?: () => void;
}
