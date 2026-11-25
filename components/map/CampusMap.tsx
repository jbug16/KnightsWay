import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Place } from "../../services/placeSearch";
// using this little plugin thing someone made:
// https://github.com/react-native-maps/react-native-maps

// same zoom the map uses when it first opens
const campusRegion = {
	latitude: 28.598101,
	longitude: -81.202883,
	latitudeDelta: 0.025,
	longitudeDelta: 0.014,
};

// close zoom for the selected place
const placeZoom = {
	latitudeDelta: 0.0035,
	longitudeDelta: 0.002,
};

type CampusMapProps = {
	// the row the user tapped in search
	selectedPlace: Place | null;
};

export default function CampusMap({ selectedPlace }: CampusMapProps) {
	// a ref is a handle to the map that is already on screen
	const mapRef = useRef<MapView>(null);
	const [mapReady, setMapReady] = useState(false);

	// slide to the tapped place once the map can move
	useEffect(() => {
		if (!mapReady || selectedPlace === null) {
			return;
		}

		mapRef.current?.animateToRegion(
			{
				latitude: selectedPlace.latitude,
				longitude: selectedPlace.longitude,
				latitudeDelta: placeZoom.latitudeDelta,
				longitudeDelta: placeZoom.longitudeDelta,
			},
			500,
		);
	}, [mapReady, selectedPlace]);

	return (
		<MapView
			ref={mapRef}
			style={styles.map}
			onPress={Keyboard.dismiss}
			onMapReady={() => setMapReady(true)}
			initialRegion={campusRegion}
		/>
	);
}

const styles = StyleSheet.create({
	map: {
		flex: 1,
		width: "100%",
	},
});
