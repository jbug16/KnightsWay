import Field from "./Field";
import Input from "./Input";

type TextFieldProps = {
	label: string;
	value: string;
	onChangeText: (value: string) => void;
	placeholder?: string;
};

export default function TextField({ label, value, onChangeText, placeholder }: TextFieldProps) {
	return (
		<Field label={label}>
			<Input value={value} onChangeText={onChangeText} placeholder={placeholder} />
		</Field>
	);
}
