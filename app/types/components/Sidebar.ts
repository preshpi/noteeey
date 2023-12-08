import { Dispatch, SetStateAction } from "react";

export interface SidebarProps {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
}
