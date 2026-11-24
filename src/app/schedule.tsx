import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";

import { Ionicons } from "@expo/vector-icons";
import ClassForm from "../../components/schedule/ClassForm";
import ClassRow from "../../components/schedule/ClassRow";
import DayChips from "../../components/schedule/helpers/DayChips";
import CircleButton from "../../components/ui/buttons/CircleButton";
import ScreenHeader from "../../components/ui/ScreenHeader";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Typography } from "../../constants/typography";
import { useClasses } from "../../contexts/ClassesContext";

export default function ScheduleScreen() {
	// let use show/hide the add/edit class popup
	const [isClassFormVisible, setClassFormVisible] = useState(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	// use our provider to get the classes
	const { classes } = useClasses();
	console.log("Classes from Context:", classes);

	// filter for the days
	const dayNumber: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 };
	const selectedDayNumbers = selectedDays.map((day) => dayNumber[day]);
	const visibleClasses =
		selectedDayNumbers.length === 0
			? classes
			: classes.filter((item) =>
					(item.meetings ?? []).some((meeting) => selectedDayNumbers.includes(meeting.day)),
				);

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<ScreenHeader
				title="My Schedule"
				button={<CircleButton icon="add" onPress={() => setClassFormVisible(true)} />}
			/>

			<View style={styles.filterContainer}>
				<DayChips selected={selectedDays} onChange={setSelectedDays} />
			</View>

			{/* show classes or error msg if no day is selected or you don't have any classes added */}
			{classes.length === 0 ? (
				<View style={styles.empty}>
					<Ionicons
						name="alert-circle-outline"
						size={Sizing.iconLarge}
						color={Colors.textSecondary}
					/>
					<Text style={styles.emptyText}>Add a class to build your schedule</Text>
				</View>
			) : selectedDays.length === 0 ? (
				<View style={styles.empty}>
					<Ionicons
						name="alert-circle-outline"
						size={Sizing.iconLarge}
						color={Colors.textSecondary}
					/>
					<Text style={styles.emptyText}>Please select a day to view your schedule</Text>
				</View>
			) : visibleClasses.length === 0 ? (
				<View style={styles.empty}>
					<Ionicons name="happy-outline" size={Sizing.iconLarge} color={Colors.textSecondary} />
					<Text style={styles.emptyText}>Yay! You have no class this day</Text>
				</View>
			) : (
				<ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
					{visibleClasses.map((item) => (
						<ClassRow key={item.id} item={item} />
					))}
				</ScrollView>
			)}

			{/* the add/edit form, by default it is hidden until clicked on */}
			<ClassForm visible={isClassFormVisible} onClose={() => setClassFormVisible(false)} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},

	filterContainer: {
		paddingHorizontal: Spacing.base,
		paddingBottom: Spacing.base,
	},

	list: {
		paddingHorizontal: Spacing.base,
		gap: Spacing.md,
	},

	listContent: {
		paddingBottom: Spacing.base,
		gap: Spacing.sm,
	},

	empty: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	emptyText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.textSecondary,
	},
});
