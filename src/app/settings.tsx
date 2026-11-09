import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsRow from "../../components/settings/SettingsRow";
import ScreenHeader from "../../components/ui/ScreenHeader";
import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";

export default function SettingsScreen() {
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<ScreenHeader title="Settings" />

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

	list: {
		paddingHorizontal: Spacing.base,
		gap: Spacing.md,
	},
});
