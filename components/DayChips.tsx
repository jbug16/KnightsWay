import { StyleSheet, View } from "react-native";
import { Spacing } from "../constants/spacing";
import FilterChip from "./FilterChip";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

type DayChipsProps = {
	selected: string[];
	onChange: (days: string[]) => void;
};

export default function DayChips({ selected, onChange }: DayChipsProps) {
	// tap a day to turn it on or off
	const toggleDay = (day: string) => {
		const next = selected.includes(day)
			? selected.filter((item) => item !== day)
			: [...selected, day];
		onChange(next);
	};

	return (
		<View style={styles.days}>
			{days.map((day) => (
				<View key={day} style={styles.day}>
					<FilterChip
						label={day}
						selected={selected.includes(day)}
						onPress={() => toggleDay(day)}
					/>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	days: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.sm,
	},

	day: {
		flex: 1,
	},
});
