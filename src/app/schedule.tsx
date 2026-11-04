import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ClassInfo from "../../components/schedule/ClassInfo";
import DayChips from "../../components/schedule/DayChips";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

import { useState } from "react";
import ClassForm from "../../components/schedule/ClassForm";
import CircleButton from "../../components/ui/CircleButton";

export default function ScheduleScreen() {
	// let use show/hide the add/edit class popup
	const [isClassFormVisible, setClassFormVisible] = useState(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.header}>
				<Text style={styles.title}>My Schedule</Text>
				<CircleButton icon="add" onPress={() => setClassFormVisible(true)} />
			</View>

			<View style={styles.filterContainer}>
				<DayChips selected={selectedDays} onChange={setSelectedDays} />
			</View>

			<View style={styles.list}>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>

				<ClassForm visible={isClassFormVisible} onClose={() => setClassFormVisible(false)} />
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Spacing.base,
		paddingTop: Spacing.base,
		paddingBottom: Spacing.md,
	},

	title: {
		fontFamily: Fonts.bold,
		fontSize: Typography.screenTitle,
		color: Colors.text,
	},

	filterContainer: {
		paddingHorizontal: Spacing.base,
		paddingBottom: Spacing.base,
	},

	list: {
		paddingHorizontal: Spacing.base,
		gap: Spacing.md,
	},

	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.white,
		borderRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
		gap: Spacing.sm,
	},

	cardInfo: {
		flex: 1,
	},
});
