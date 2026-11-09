import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
	label: string;
	icon?: ComponentProps<typeof Ionicons>["name"];
	variant?: ButtonVariant;
	onPress?: () => void;
};

const variantColors: Record<
	ButtonVariant,
	{ backgroundColor: string; color: string; iconColor: string }
> = {
	primary: {
		backgroundColor: Colors.primary,
		color: Colors.black,
		iconColor: Colors.black,
	},
	secondary: {
		backgroundColor: Colors.surface,
		color: Colors.black,
		iconColor: Colors.black,
	},
};

export default function Button({ label, icon, variant = "primary", onPress }: ButtonProps) {
	const colors = variantColors[variant];

	return (
		<Pressable onPress={onPress} style={styles.button}>
			<View style={[styles.label, { backgroundColor: colors.backgroundColor }]}>
				{icon ? <Ionicons name={icon} size={Sizing.iconMed} color={colors.iconColor} /> : null}
				<Text style={[styles.buttonText, { color: colors.color }]}>{label}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
	},

	label: {
		flex: 1,
		flexDirection: "row",
		gap: Spacing.sm,
		height: Sizing.buttonHeight,
		borderRadius: Sizing.radiusMedium,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: Spacing.md,
	},

	buttonText: {
		flexShrink: 1,
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
	},
});
