import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

// allow different labels
type FilterChipProps = {
	label: string;
	icon?: ComponentProps<typeof Ionicons>["name"];
	selected?: boolean;
};

export default function FilterChip({ label, icon, selected }: FilterChipProps) {
	return (
		<View style={[styles.label, selected && styles.selected]}>
			{icon ? (
				<Ionicons name={icon} size={Sizing.iconMed} color={Colors.black} />
			) : null}
			<Text style={styles.buttonText}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		flexDirection: "row",
		gap: Spacing.sm,
		height: Sizing.buttonHeight,
		paddingHorizontal: Spacing.md,
		backgroundColor: Colors.surface,
		borderRadius: Sizing.radiusLarge, // round corners
		borderWidth: Sizing.borderThin,
		borderColor: Colors.border,
		alignItems: "center",
		justifyContent: "center",
	},

	selected: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},

	buttonText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.black,
	},
});
