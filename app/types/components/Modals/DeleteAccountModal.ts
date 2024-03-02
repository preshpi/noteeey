import { Dispatch, SetStateAction } from "react";

export interface DeleteAccountModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
  handleDeleteAccount: () => void;
}
