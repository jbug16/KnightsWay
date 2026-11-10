import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { Spacing } from "../../constants/spacing";

import ClassForm from "../../components/schedule/ClassForm";
import ClassRow from "../../components/schedule/ClassRow";
import DayChips from "../../components/schedule/helpers/DayChips";
import CircleButton from "../../components/ui/buttons/CircleButton";
import ScreenHeader from "../../components/ui/ScreenHeader";
import { useClasses } from "../../contexts/ClassesContext";

export default function ScheduleScreen() {
	// let use show/hide the add/edit class popup
	const [isClassFormVisible, setClassFormVisible] = useState(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	// use our provider to get the classes
	const { classes } = useClasses();
	console.log("Classes from Context:", classes);

	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<ScreenHeader
				title="My Schedule"
				action={<CircleButton icon="add" onPress={() => setClassFormVisible(true)} />}
			/>

			<View style={styles.filterContainer}>
				<DayChips selected={selectedDays} onChange={setSelectedDays} />
			</View>

			<ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
				{/* the card for each class */}
				{classes.map((item) => (
					<ClassRow key={item.id} item={item} />
				))}

				{/* the add/edit form, by default it is hidden until clicked on */}
				<ClassForm visible={isClassFormVisible} onClose={() => setClassFormVisible(false)} />
			</ScrollView>
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
});
