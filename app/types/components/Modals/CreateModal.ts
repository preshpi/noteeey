import { Dispatch, SetStateAction } from "react";

export interface CreateModalProps {
  show: boolean;
  content: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  buttonContent?: string;
  buttonAction?: () => void;
  addNewNote: (newNote: any) => void;
}
