// this is a map item popup that shows info abotu that map item
// the place comes from buildings.json

import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import buildings from "../../data/buildings.json";
import { parkingSpots } from "../../services/parkingSpots";
import { Place } from "../../services/placeSearch";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import CloseButton from "../ui/buttons/CloseButton";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type Detail = {
	icon: IoniconName;
	label: string;
	value: string;
};

type PlaceSheetProps = {
	code: string;
	onClose: () => void;
};

function isParkingPlace(name: string) {
	const label = name.toLowerCase();
	return label.includes("garage") || label.includes("lot");
}

function detailsFor(place: Place) {
	const rows: Detail[] = [];
	if (isParkingPlace(place.name)) {
		rows.push({
			icon: "car-outline",
			label: "Available Spaces",
			value: parkingSpots(place.code),
		});
	}
	if (place.type) {
		rows.push({ icon: "business-outline", label: "Building", value: place.type });
	}
	if (place.hours) {
		rows.push({ icon: "time-outline", label: "Hours", value: place.hours });
	}
	if (place.permit) {
		rows.push({ icon: "pricetag-outline", label: "Permit Required", value: place.permit });
	}
	return rows;
}

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

	const isParking = isParkingPlace(building.name);
	const details = detailsFor(building);

	return (
		<BottomSheet onClose={onClose} backdrop={false}>
			<View style={styles.header}>
				<Text style={styles.title}>{building.name}</Text>
				<CloseButton onPress={onClose} />
			</View>

			{details.map((row) => (
				<View key={row.label} style={styles.detailRow}>
					<View style={styles.detailLabel}>
						<Ionicons name={row.icon} size={Sizing.iconMed} color={Colors.textSecondary} />
						<Text style={styles.detailLabelText}>{row.label}</Text>
					</View>
					<Text style={styles.detailValue}>{row.value}</Text>
				</View>
			))}

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

	detailRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: Spacing.md,
		paddingVertical: Spacing.base,
		borderBottomWidth: Sizing.borderThin,
		borderBottomColor: Colors.border,
	},

	detailLabel: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		flexShrink: 1,
	},

	detailLabelText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.textSecondary,
	},

	detailValue: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.text,
		textAlign: "right",
	},

	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},
});
