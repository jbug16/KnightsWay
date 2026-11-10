// this is a reusable header that allows me to make sure all are the same size/font/style
// and i can add a button if needed (only the schedule page needs it so far but it is simplier to make it reusable!!)

// copied this over from ScreenHeader, just changed the font size so we can use across all BottomSheets

import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Typography } from "../../constants/typography";

type SheetHeaderProps = {
	title: string;
	action?: ReactNode;
	onPress?: () => void;
};

export default function SheetHeader({ title, action, onPress }: SheetHeaderProps) {
	return (
		<Pressable onPress={onPress} disabled={!onPress}>
			<View style={styles.row}>
				<Text style={styles.title}>{title}</Text>
				{action ? <View style={styles.actionSlot} /> : null}
				{action ? <View style={styles.action}>{action}</View> : null}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	actionSlot: {
		width: Sizing.buttonHeight,
	},

	action: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: "center",
	},

	title: {
		fontFamily: Fonts.bold,
		fontSize: Typography.sectionTitle,
		color: Colors.text,
	},
});
