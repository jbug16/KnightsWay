// one class section the user can pick

import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { CourseSection } from "../../services/sectionSearch";
import MeetingLine from "./helpers/MeetingLine";

type SectionRowProps = {
	section: CourseSection;
	selected?: boolean;
	onPress?: () => void;
};

export default function SectionRow({ section, selected = false, onPress }: SectionRowProps) {
	return (
		<Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
			<Text style={styles.name}>Section {section.section}</Text>
			<Text style={styles.title}>{section.title}</Text>
			{section.meetings.map((meeting, index) => (
				<MeetingLine key={index} meeting={meeting} />
			))}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		gap: Spacing.xs,
		backgroundColor: Colors.white,
		borderRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
	},

	selected: {
		borderColor: Colors.primary,
		borderWidth: Sizing.borderMedium,
	},

	name: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.text,
	},

	title: {
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.textSecondary,
	},
});
