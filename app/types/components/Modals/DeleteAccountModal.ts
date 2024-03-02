import { Dispatch, SetStateAction } from "react";

export interface DeleteAccountModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean | null>>;
  buttonContent?: string;
  buttonAction?: () => void;
  handleDeleteAccount: () => void;
}
