import { Colors } from "../../../constants/colors";
import CircleButton from "./CircleButton";

type CloseButtonProps = {
	onPress?: () => void;
};

export default function CloseButton({ onPress }: CloseButtonProps) {
	return (
		<CircleButton
			icon="close"
			bgColor={Colors.surface}
			iconColor={Colors.black}
			onPress={onPress}
			accessibilityLabel="Close"
		/>
	);
}
