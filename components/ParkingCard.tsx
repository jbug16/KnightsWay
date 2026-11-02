import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

type ParkingCardProps = {
  favorite?: boolean;
};

export default function ParkingCard({ favorite = false }: ParkingCardProps) {
  return (
    <View style={[styles.card, favorite && styles.favorite]}>
      <Ionicons
        name={favorite ? "star" : "square-outline"}
        size={Sizing.iconMed}
        color={Colors.black}
      />
      <View style={styles.info}>
        <Text style={styles.name}>Garage A</Text>
        <View style={styles.status}>
          <Ionicons
            name="ellipse-outline"
            size={Sizing.iconSmall}
            color={Colors.textSecondary}
          />
          <Text style={styles.statusText}>42% Full</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={Sizing.iconMed}
        color={Colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

  favorite: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
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

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },

  statusText: {
    fontFamily: Fonts.regular,
    fontSize: Typography.secondary,
    color: Colors.textSecondary,
  },
});
