// this is a bottom sheet that is on the home page to tell the user what class is next

import { StyleSheet, View } from "react-native";
import { Spacing } from "../../constants/spacing";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/Button";
import ClassSummary from "./ClassSummary";

export default function NextClassSheet() {
	return (
		<BottomSheet title="Next Class">
			<View>
				<ClassSummary />
			</View>
			{/* buttons */}
			<View style={styles.buttonContainer}>
				<Button variant="secondary" label="Indoor Map" icon="map-outline" />
				<Button variant="primary" label="Navigate" icon="navigate-outline" />
			</View>
		</BottomSheet>
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
