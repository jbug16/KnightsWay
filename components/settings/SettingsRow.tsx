import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

type SettingsRowProps = {
	icon: ComponentProps<typeof Ionicons>["name"];
	label: string;
	value?: string;
	toggle?: boolean;
	chevron?: boolean;
};

export default function SettingsRow({
	icon,
	label,
	value,
	toggle = false,
	chevron = false,
}: SettingsRowProps) {
	return (
		<View style={styles.card}>
			<Ionicons name={icon} size={Sizing.iconMed} color={Colors.black} />
			<View style={styles.info}>
				<Text style={styles.label}>{label}</Text>
				{value ? (
					<View style={styles.dropdown}>
						<Text style={styles.value}>{value}</Text>
						<Ionicons name="chevron-down" size={Sizing.iconSmall} color={Colors.textSecondary} />
					</View>
				) : null}
			</View>
			{toggle ? (
				<View style={styles.track}>
					<View style={styles.knob} />
				</View>
			) : null}
			{chevron ? (
				<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.white,
		borderRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
		gap: Spacing.md,
	},

	info: {
		flex: 1,
		gap: Spacing.sm,
	},

	label: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.text,
	},

	dropdown: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		gap: Spacing.sm,
		height: Sizing.buttonHeight,
		paddingHorizontal: Spacing.md,
		backgroundColor: Colors.surface,
		borderRadius: Sizing.radiusMedium,
		borderWidth: Sizing.borderThin,
		borderColor: Colors.border,
	},

	value: {
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.text,
	},

	track: {
		width: Sizing.iconBackground,
		height: Sizing.buttonHeight,
		borderRadius: Sizing.buttonHeight / 2,
		backgroundColor: Colors.primary,
		alignItems: "flex-end",
		justifyContent: "center",
		padding: Spacing.xs,
	},

	knob: {
		width: Sizing.iconMed,
		height: Sizing.iconMed,
		borderRadius: Sizing.iconMed / 2,
		backgroundColor: Colors.white,
	},
});
