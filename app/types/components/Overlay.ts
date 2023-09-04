import { Dispatch, SetStateAction } from "react";

export interface OverlayProps extends React.PropsWithChildren {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	modalRef: any;
}
