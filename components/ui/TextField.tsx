import FormField from "./FormField";
import Input from "./Input";

type TextFieldProps = {
	label: string;
	value: string;
	onChangeText: (value: string) => void;
	placeholder?: string;
};

export default function TextField({ label, value, onChangeText, placeholder }: TextFieldProps) {
	return (
		<FormField label={label}>
			<Input value={value} onChangeText={onChangeText} placeholder={placeholder} />
		</FormField>
	);
}
