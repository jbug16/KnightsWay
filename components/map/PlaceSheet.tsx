// this is a map item popup that shows info abotu that map item
// the place comes from buildings.json

import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import buildings from "../../data/buildings.json";
import { Place } from "../../services/placeSearch";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import CloseButton from "../ui/buttons/CloseButton";

type PlaceSheetProps = {
	code: string;
	onClose: () => void;
};

function findBuilding(code: string) {
	for (const building of buildings as Place[]) {
		if (building.code === code) {
			return building;
		}
	}
	return null;
}

export default function PlaceSheet({ code, onClose }: PlaceSheetProps) {
	const building = findBuilding(code);
	if (!building) {
		return null;
	}

	const isParking =
		building.name.toLowerCase().includes("garage") || building.name.toLowerCase().includes("lot");

	return (
		<BottomSheet onClose={onClose}>
			<View style={styles.header}>
				<Text style={styles.title}>{building.name}</Text>
				<CloseButton onPress={onClose} />
			</View>

			<View style={styles.buttonContainer}>
				<Button
					variant="secondary"
					label={isParking ? "Save Spot" : "Indoor Map"}
					icon={isParking ? "save-outline" : "map-outline"}
				/>
				<Button variant="primary" label="Navigate" icon="navigate-outline" />
			</View>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.base,
		marginBottom: Spacing.lg,
	},

	title: {
		flex: 1,
		fontFamily: Fonts.bold,
		fontSize: Typography.screenTitle,
		color: Colors.text,
	},

	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},
});
