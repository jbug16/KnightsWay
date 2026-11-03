import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

export default function ButtonSecondary() {
	return (
		<View style={styles.label}>
			<Ionicons name="map-outline" size={Sizing.iconMed} color={Colors.black} />
			<Text style={styles.buttonText}>Action</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		flex: 1,
		flexDirection: "row",
		gap: Spacing.sm,
		height: Sizing.buttonHeight,
		backgroundColor: Colors.surface,
		borderRadius: Sizing.radiusMedium,
		alignItems: "center",
		justifyContent: "center",
	},

	buttonText: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.black,
	}
});
