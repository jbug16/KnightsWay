import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParkingRow from "../../components/parking/ParkingRow";
import ScreenHeader from "../../components/ui/ScreenHeader";
import SearchBar from "../../components/ui/SearchBar";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";

export default function ParkingScreen() {
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<ScreenHeader title="Parking" />

			<View style={styles.search}>
				<SearchBar />
			</View>

			<View style={styles.list}>
				<ParkingRow favorite name="Garage A" status={50} />
				<ParkingRow name="Garage B" status={10} />
				<ParkingRow name="Garage C" status={98} />
				<ParkingRow name="Garage I" status={67} />
				<ParkingRow name="Garage J" status={24} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
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
