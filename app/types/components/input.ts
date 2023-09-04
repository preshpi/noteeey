export interface inputprops {
    label?: string;
	name: string;
	id: string;
	type: string;
	additionalClasses?: string;
	placeholder: string;
	value?: string;
    autoComplete: string;
	onChange: (e: any) => void;
	pattern?: string;
	password?: boolean;
	additionalAttributes?: { [propName: string]: any };
	select?: boolean;
	textarea?: boolean;
	rows?: number;
	cols?: number;
	disabled?: boolean;
	required: boolean;
	minLength?: number;
	maxLength?: number;
}