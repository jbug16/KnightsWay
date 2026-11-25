import Input from "./Input";

type SearchBarProps = {
	value?: string;
	onChangeText?: (value: string) => void;
	onFocus?: () => void;
	onClear?: () => void;
};

export default function SearchBar({ value, onChangeText, onFocus, onClear }: SearchBarProps) {
	return (
		<Input
			icon="search"
			placeholder="Search..."
			value={value}
			onChangeText={onChangeText}
			onFocus={onFocus}
			onClear={onClear}
		/>
	);
}
