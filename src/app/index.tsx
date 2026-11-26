import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// My custom components
import CampusMap from "../../components/map/CampusMap";
import PlaceSheet from "../../components/map/PlaceSheet";
import SearchResults from "../../components/map/SearchResults";
import NextClassSheet from "../../components/schedule/NextClassSheet";
import Chip from "../../components/ui/Chip";
import SearchBar from "../../components/ui/SearchBar";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";
import { findPlaces, Place } from "../../services/placeSearch";

export default function Index() {
	const navigation = useNavigation();
	const [isNextClassOpen, setNextClassOpen] = useState(true);
	const [query, setQuery] = useState("");
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
	const places = findPlaces(query);
	const hideTabs = isSearchOpen || selectedPlace !== null;

	// the x clears the text and brings the map back
	function clearSearch() {
		setQuery("");
		setSearchOpen(false);
		Keyboard.dismiss();
	}

	// remember the row the user tapped then close the search
	function choosePlace(place: Place) {
		setSelectedPlace(place);
		clearSearch();
	}

	// hide the bottom tabs while search or a place sheet is open
	useEffect(() => {
		if (!hideTabs) {
			return;
		}

		navigation.setOptions({
			tabBarStyle: { display: "none" },
		});

		return () => {
			navigation.setOptions({
				tabBarStyle: {
					backgroundColor: Colors.white,
					borderTopColor: Colors.border,
				},
			});
		};
	}, [hideTabs, navigation]);

	return (
		// safe area let's me hide the weird android nav top and not overlap my titles
		// with the phone information and camera
		<SafeAreaView style={styles.container} edges={hideTabs ? ["top", "bottom"] : ["top"]}>
			<View style={styles.header}>
				<SearchBar
					value={query}
					onChangeText={setQuery}
					onFocus={() => setSearchOpen(true)}
					onClear={isSearchOpen ? clearSearch : undefined}
				/>
			</View>

			{isSearchOpen ? (
				query.trim() === "" ? (
					<View style={styles.searchScreen} />
				) : (
					<SearchResults places={places} onPress={choosePlace} />
				)
			) : (
				<>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.filterRow}
						contentContainerStyle={styles.filterContent}
						onTouchStart={Keyboard.dismiss}
					>
						<Chip label="Classes" icon="school" />
						<Chip label="Parking" icon="car" />
						<Chip label="Buildings" icon="home" />
						<Chip label="Bus Stops" icon="bus" />
					</ScrollView>

					<View style={styles.mapContainer}>
						<CampusMap selectedPlace={selectedPlace} />
						{selectedPlace ? (
							<View style={styles.placeOverlay}>
								<PlaceSheet code={selectedPlace.code} onClose={() => setSelectedPlace(null)} />
							</View>
						) : null}
					</View>

					{selectedPlace ? null : (
						<View style={styles.cardContainer}>
							<NextClassSheet
								isOpen={isNextClassOpen}
								onOpen={() => setNextClassOpen(true)}
								onClose={() => setNextClassOpen(false)}
							/>
						</View>
					)}
				</>
			)}
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

	placeOverlay: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},

	searchScreen: {
		flex: 1,
		backgroundColor: Colors.background,
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
