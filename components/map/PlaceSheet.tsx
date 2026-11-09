// this is a map item popup that shows info abotu that map item
// 3 different kinds of places: non class building, class building and parking lot/garage

import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/Button";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type ClassSession = {
	code: string;
	room: string;
	time: string;
};

type Detail = {
	icon: IoniconName;
	label: string;
	value: string;
};

type PlaceVariant = "class-building" | "building" | "parking";

type PlaceContent = {
	name: string;
	icon: IoniconName;
	iconTile: boolean;
	classes?: ClassSession[];
	details?: Detail[];
	secondaryLabel: string;
	secondaryIcon: IoniconName;
};

type PlaceSheetProps = {
	variant?: PlaceVariant;
};

const places: Record<PlaceVariant, PlaceContent> = {
	"class-building": {
		name: "Engineering I",
		icon: "book-outline",
		iconTile: true,
		classes: [
			{ code: "COP 1234", room: "Room 104", time: "9:00 AM - 10:15 AM" },
			{ code: "COP 1234", room: "Room 104", time: "9:00 AM - 10:15 AM" },
		],
		secondaryLabel: "View Indoor Map",
		secondaryIcon: "map-outline",
	},
	building: {
		name: "John C. Hitt Library",
		icon: "cube-outline",
		iconTile: true,
		details: [
			{ icon: "business-outline", label: "Building", value: "Library" },
			{ icon: "time-outline", label: "Hours", value: "7:00 AM - 12:00 AM" },
		],
		secondaryLabel: "View Indoor Map",
		secondaryIcon: "map-outline",
	},
	parking: {
		name: "Garage B",
		icon: "star-outline",
		iconTile: false,
		details: [
			{ icon: "car-outline", label: "Available Spaces", value: "420" },
			{ icon: "pricetag-outline", label: "Permit Required", value: "D Permit" },
			{ icon: "school-outline", label: "Lot Type", value: "Student" },
			{ icon: "time-outline", label: "Hours", value: "24/7" },
		],
		secondaryLabel: "Save Parking Spot",
		secondaryIcon: "save-outline",
	},
};

function IconTile({ name, large = false }: { name: IoniconName; large?: boolean }) {
	return (
		<View style={[styles.iconTile, large && styles.iconTileLarge]}>
			<Ionicons name={name} size={Sizing.iconMed} color={Colors.black} />
		</View>
	);
}

function DetailRows({ rows }: { rows: Detail[] }) {
	return (
		<View>
			{rows.map((row) => (
				<View key={row.label} style={styles.detailRow}>
					<View style={styles.detailLabel}>
						<Ionicons name={row.icon} size={Sizing.iconMed} color={Colors.textSecondary} />
						<Text style={styles.detailLabelText}>{row.label}</Text>
					</View>
					<Text style={styles.detailValue}>{row.value}</Text>
				</View>
			))}
		</View>
	);
}

function ClassList({ classes }: { classes: ClassSession[] }) {
	return (
		<View style={styles.classSection}>
			<Text style={styles.sectionTitle}>Classes Here</Text>
			<View style={styles.classList}>
				{classes.map((session, index) => (
					<View key={`${session.code}-${index}`} style={styles.classCard}>
						<IconTile name="book-outline" />
						<View style={styles.classText}>
							<Text style={styles.classCode}>{session.code}</Text>
							<View style={styles.meta}>
								<Ionicons
									name="location-outline"
									size={Sizing.iconSmall}
									color={Colors.textSecondary}
								/>
								<Text style={styles.metaText}>{session.room}</Text>
							</View>
							<View style={styles.meta}>
								<Ionicons
									name="time-outline"
									size={Sizing.iconSmall}
									color={Colors.textSecondary}
								/>
								<Text style={styles.metaText}>{session.time}</Text>
							</View>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}

export default function PlaceSheet({ variant = "class-building" }: PlaceSheetProps) {
	const place = places[variant];

	return (
		<BottomSheet showHandle>
			<View style={styles.header}>
				{place.iconTile ? (
					<IconTile name={place.icon} large />
				) : (
					<Ionicons name={place.icon} size={Typography.screenTitle} color={Colors.black} />
				)}
				<Text style={styles.title}>{place.name}</Text>
			</View>

			{place.details ? <DetailRows rows={place.details} /> : null}
			{place.classes ? <ClassList classes={place.classes} /> : null}

			<View style={styles.buttonContainer}>
				<Button variant="secondary" label={place.secondaryLabel} icon={place.secondaryIcon} />
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

	iconTile: {
		width: Sizing.iconLarge,
		height: Sizing.iconLarge,
		borderRadius: Sizing.radiusMedium,
		backgroundColor: Colors.surface,
		alignItems: "center",
		justifyContent: "center",
	},

	iconTileLarge: {
		width: Sizing.iconBackground,
		height: Sizing.iconBackground,
		borderRadius: Sizing.radiusLarge,
	},

	sectionTitle: {
		fontFamily: Fonts.bold,
		fontSize: Typography.cardTitle,
		color: Colors.text,
	},

	classSection: {
		gap: Spacing.md,
	},

	classList: {
		gap: Spacing.md,
	},

	classCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		backgroundColor: Colors.white,
		borderRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
	},

	classText: {
		flex: 1,
		gap: Spacing.xs,
	},

	classCode: {
		fontFamily: Fonts.bold,
		fontSize: Typography.body,
		color: Colors.text,
	},

	meta: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.xs,
	},

	metaText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.textSecondary,
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
