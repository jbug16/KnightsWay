import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { Ionicons } from "@expo/vector-icons";

// allow different labels
type FilterChipProps = {
  label: string;
  icon: string;
};

export default function FilterChip({ label, icon }: FilterChipProps) {
  return (
    <View style={styles.label}>
      <Ionicons name={icon} size={Sizing.iconMed} color={Colors.black} />
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    gap: Spacing.sm,
    height: Sizing.buttonHeight,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Sizing.radiusLarge, // round corners
    borderWidth: Sizing.borderThin,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: Fonts.regular,
    fontSize: Typography.body,
    color: Colors.black,
  },
});
