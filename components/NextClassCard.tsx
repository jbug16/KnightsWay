import { StyleSheet, View } from "react-native";
import { Spacing } from "../constants/spacing";
import Button from "./Button";
import ClassInfo from "./ClassInfo";
import Sheet from "./Sheet";

export default function NextClassCard() {
	return (
		<Sheet title="Next Class">
			{/* Class information */}
			<View>
				<ClassInfo />
			</View>
			{/* buttons */}
			<View style={styles.buttonContainer}>
				<Button variant="secondary" label="View Indoor Map" icon="map-outline" />
				<Button variant="primary" label="Navigate" icon="navigate-outline" />
			</View>
		</Sheet>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},
});
