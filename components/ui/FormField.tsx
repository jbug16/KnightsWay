// label with one control under it

import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

type FormFieldProps = {
	label: string;
	children: ReactNode;
};

export default function FormField({ label, children }: FormFieldProps) {
	return (
		<View style={styles.field}>
			<Text style={styles.label}>{label}</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		gap: Spacing.sm,
	},

	label: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.text,
	},
});
