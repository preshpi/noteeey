export interface ButtonProps extends React.PropsWithChildren {
	link?: string;
	disabled?: boolean;
	additionalClasses: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}