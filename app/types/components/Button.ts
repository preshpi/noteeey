export interface ButtonProps extends React.PropsWithChildren {
	link?: string;
	disabled?: boolean;
	className: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}