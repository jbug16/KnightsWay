import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

type TagProps = {
	text: string;
};

export default function Tag({ text }: TagProps) {
	return (
		<View>
			<Text style={styles.label}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.secondary,
		color: Colors.black,
		backgroundColor: Colors.primary,
		borderRadius: Sizing.radiusMedium,
		paddingHorizontal: Spacing.sm,
		alignSelf: "flex-start",
	},
});
