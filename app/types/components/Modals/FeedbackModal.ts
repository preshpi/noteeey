import { Dispatch, SetStateAction } from "react";

export interface FeedbackModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
}
