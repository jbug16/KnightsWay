// a list of buildings and parking that match the search box

import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { Place } from "../../services/placeSearch";

type SearchResultsProps = {
	places: Place[];
};

// parking names include "garage" or "lot"
// otherwise it's most likely just another building
function placeLabel(place: Place) {
	if (place.name.toLowerCase().includes("garage") || place.name.toLowerCase().includes("lot")) {
		return "Parking";
	}
	return "Building";
}

export default function SearchResults({ places }: SearchResultsProps) {
	if (places.length === 0) {
		return (
			<View style={styles.emptyWrap}>
				<Text style={styles.empty}>No places found</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.list}
			contentContainerStyle={styles.listContent}
			keyboardShouldPersistTaps="handled"
		>
			{places.map((place) => {
				const label = placeLabel(place);
				return (
					<Pressable key={place.code} style={styles.card}>
						<Ionicons
							name={label === "Parking" ? "car-outline" : "business-outline"}
							size={Sizing.iconMed}
							color={Colors.black}
						/>
						<View style={styles.info}>
							<Text style={styles.name}>{place.name}</Text>
							<Text style={styles.label}>{label}</Text>
						</View>
					</Pressable>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		backgroundColor: Colors.background,
	},

	listContent: {
		gap: Spacing.sm,
		paddingHorizontal: Spacing.sm,
		paddingBottom: Spacing.sm,
	},

	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.white,
		borderRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
		gap: Spacing.md,
	},

	info: {
		flex: 1,
		gap: Spacing.xs,
	},

	name: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.text,
	},

	label: {
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.textSecondary,
	},

	emptyWrap: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingHorizontal: Spacing.sm,
		paddingBottom: Spacing.sm,
	},

	empty: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.textSecondary,
	},
});
