import { Dispatch, SetStateAction } from "react";

export interface FeedbackModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean | null>>;
  buttonContent?: string;
  buttonAction?: () => void;
}
