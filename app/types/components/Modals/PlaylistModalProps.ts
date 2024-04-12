import { Dispatch, SetStateAction } from "react";

export interface PlaylistModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handlePlaylistSubmit: (embedCode: string) => void;
}
