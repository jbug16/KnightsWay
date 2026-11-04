import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

type InputProps = {
	value?: string;
	onChangeText?: (value: string) => void;
	placeholder?: string;
	icon?: ComponentProps<typeof Ionicons>["name"];
};

export default function Input({ value, onChangeText, placeholder, icon }: InputProps) {
	return (
		<View style={styles.container}>
			{icon ? <Ionicons name={icon} size={Sizing.iconMed} color={Colors.textSecondary} /> : null}
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={Colors.textSecondary}
			/>
		</View>
	);
}

// Styling
const styles = StyleSheet.create({
	container: {
		flexDirection: "row", // icon and input are side by side
		alignItems: "center", // center items vertically
		backgroundColor: Colors.surface,
		paddingHorizontal: Spacing.md, // space on left and right on elements inside
		borderRadius: Sizing.radiusLarge, // round corners
		borderWidth: Sizing.borderThin,
		borderColor: Colors.border,
		height: Sizing.inputHeight,
		gap: Spacing.sm, // space b/w icon and text
	},

	input: {
		flex: 1, // input takes up remaining horizontal space
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.text,
	},
});
