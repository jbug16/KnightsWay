import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Sizing } from "../constants/sizing";
import { Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import ClassInfo from "./ClassInfo";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

export default function NextClassCard() {
  return (
    <View style={styles.container}>
      // Top text
      <View>
        <Text style={styles.titleText}>Next Class</Text>
      </View>
      // Dividing line
      <View style={styles.divider} />
      // Class information
      <View>
        <ClassInfo />
      </View>
      // buttons
      <View style={styles.buttonContainer}>
        <ButtonSecondary />
        <ButtonPrimary />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizing.radiusLarge,
    borderTopRightRadius: Sizing.radiusLarge,
    borderColor: Colors.border,
    borderWidth: Sizing.borderThin,
    padding: Spacing.base,
    minHeight: 120,
  },

  titleText: {
    fontSize: Typography.sectionTitle,
    fontFamily: Fonts.bold,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingTop: Spacing.base,
  }
});
