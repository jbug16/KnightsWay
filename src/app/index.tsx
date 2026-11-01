import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// My custom components
import CampusMap from "../../components/CampusMap";
import FilterChip from "../../components/FilterChip";
import NextClassCard from "../../components/NextClassCard";
import SearchBar from "../../components/SearchBar";
import { Spacing } from "../../constants/spacing";

export default function Index() {
  return (
    // safe area let's me hide the weird android nav top and not overlap my titles
    // with the phone information and camera 
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <SearchBar />
      </View>

      <View style={styles.filterContainer}>
        <FilterChip label="Classes" icon="school" />
        <FilterChip label="Parking" icon="car" />
        <FilterChip label="Buildings" icon="home" />
        <FilterChip label="Bus Stops" icon="bus" />
      </View>

      <View style={styles.mapContainer}>
        <CampusMap />
      </View>

      <View style={styles.cardContainer}>
        <NextClassCard />
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

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  mapContainer: {
    flex: 1,
  },

  cardContainer: {},
});
