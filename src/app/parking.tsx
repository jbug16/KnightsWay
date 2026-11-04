import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParkingCard from "../../components/parking/ParkingCard";
import SearchBar from "../../components/ui/SearchBar";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

export default function ParkingScreen() {
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.header}>
				<Text style={styles.title}>Parking</Text>
			</View>

			<View style={styles.search}>
				<SearchBar />
			</View>

			<View style={styles.list}>
				<ParkingCard favorite />
				<ParkingCard />
				<ParkingCard />
				<ParkingCard />
				<ParkingCard />
				<ParkingCard />
				<ParkingCard />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},

	header: {
		paddingHorizontal: Spacing.base,
		paddingTop: Spacing.base,
		paddingBottom: Spacing.md,
	},

	title: {
		fontFamily: Fonts.bold,
		fontSize: Typography.screenTitle,
		color: Colors.text,
	},

	search: {
		paddingHorizontal: Spacing.base,
		paddingBottom: Spacing.base,
	},

	list: {
		paddingHorizontal: Spacing.base,
		gap: Spacing.md,
	},
});
