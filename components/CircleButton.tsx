import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { Sizing } from "../constants/sizing";

type ButtonProps = {
	icon?: ComponentProps<typeof Ionicons>["name"];
	bgColor?: string;
	iconColor?: string;
	onPress?: () => void;
};

export default function Button({
	icon,
	bgColor = Colors.primary,
	iconColor = Colors.black,
	onPress,
}: ButtonProps) {
	return (
		<Pressable style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
			<Ionicons name={icon} size={Sizing.iconMed} color={iconColor} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		width: Sizing.buttonHeight,
		height: Sizing.buttonHeight,
		borderRadius: Sizing.buttonHeight,
		alignItems: "center",
		justifyContent: "center",
	},
});
