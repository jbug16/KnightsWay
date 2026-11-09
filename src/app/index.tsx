import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// My custom components
import CampusMap from "../../components/map/CampusMap";
import NextClassSheet from "../../components/schedule/NextClassSheet";
import Chip from "../../components/ui/Chip";
import SearchBar from "../../components/ui/SearchBar";
import { Spacing } from "../../constants/spacing";

export default function Index() {
	return (
		// safe area let's me hide the weird android nav top and not overlap my titles
		// with the phone information and camera
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.header}>
				<SearchBar />
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.filterRow}
				contentContainerStyle={styles.filterContent}
			>
				<Chip label="Classes" icon="school" />
				<Chip label="Parking" icon="car" />
				<Chip label="Buildings" icon="home" />
				<Chip label="Bus Stops" icon="bus" />
			</ScrollView>

			<View style={styles.mapContainer}>
				<CampusMap />
			</View>

			<View style={styles.cardContainer}>
				<NextClassSheet />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header: {
		padding: Spacing.sm,
	},

	mapContainer: {
		flex: 1,
	},

	filterRow: {
		flexGrow: 0,
	},

	filterContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.sm,
		paddingHorizontal: Spacing.sm,
		paddingBottom: Spacing.sm,
	},

	cardContainer: {},
});
