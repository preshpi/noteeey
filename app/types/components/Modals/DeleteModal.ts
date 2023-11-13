import { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  show: boolean;
  content: string;
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
  handleDeleteCard: (id: string) => void;
}
