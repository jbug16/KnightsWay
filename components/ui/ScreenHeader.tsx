// this is a reusable header that allows me to make sure all are the same size/font/style
// and i can add a button if needed (only the schedule page needs it so far but it is simplier to make it reusable!!)

import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

type ScreenHeaderProps = {
	title: string;
	button?: ReactNode;
};

export default function ScreenHeader({ title, button }: ScreenHeaderProps) {
	return (
		<View style={styles.header}>
			<View style={styles.row}>
				<Text style={styles.title}>{title}</Text>
				{button}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: Spacing.base,
		paddingTop: Spacing.base,
		paddingBottom: Spacing.md,
	},

	row: {
		minHeight: Sizing.buttonHeight,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	title: {
		fontFamily: Fonts.bold,
		fontSize: Typography.screenTitle,
		color: Colors.text,
	},
});
