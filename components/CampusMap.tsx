import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
// using this little plugin thing someone made:
// https://github.com/react-native-maps/react-native-maps

export default function CampusMap() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 28.598101,
        longitude: -81.202883,
        latitudeDelta: 0.025,
        longitudeDelta: 0.014,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
  },
});
