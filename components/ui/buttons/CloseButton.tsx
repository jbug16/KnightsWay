import { Colors } from "../../../constants/colors";
import { Sizing } from "../../../constants/sizing";
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
			size={Sizing.buttonHeight}
			onPress={onPress}
			accessibilityLabel="Close"
		/>
	);
}
