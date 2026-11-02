import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsRow from "../../components/SettingsRow";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.list}>
        <SettingsRow icon="square-outline" label="Permit Type" value="Student" />
        <SettingsRow icon="sunny-outline" label="App Appearance" value="Light" />
        <SettingsRow icon="notifications-outline" label="App Appearance" toggle />
        <SettingsRow icon="chatbubble-outline" label="Send Feedback" chevron />
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

  list: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
  },
});
