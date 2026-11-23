// the time and room under a class

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { Fonts } from "../../../constants/fonts";
import { Sizing } from "../../../constants/sizing";
import { Spacing } from "../../../constants/spacing";
import { Typography } from "../../../constants/typography";
import { ClassMeeting } from "../../../types/ClassMeeting";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type MeetingLineProps = {
	meeting: ClassMeeting;
};

// "09:00" -> "9:00 AM"
function to12Hour(time: string) {
	const parts = time.split(":");
	let hour = Number(parts[0]);
	const minute = parts[1];
	let period = "AM";

	if (hour >= 12) {
		period = "PM";
	}
	if (hour > 12) {
		hour = hour - 12;
	}
	if (hour === 0) {
		hour = 12;
	}

	return hour + ":" + minute + " " + period;
}

export default function MeetingLine({ meeting }: MeetingLineProps) {
	const time = days[meeting.day] + " " + to12Hour(meeting.startTime) + " - " + to12Hour(meeting.endTime);
	const place = meeting.building + ", Room " + meeting.room;

	return (
		<View style={styles.meeting}>
			{/* location */}
			<View style={styles.label}>
				<Ionicons name="location-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
				<Text style={styles.labelText}>{place}</Text>
			</View>
			{/* time */}
			<View style={styles.label}>
				<Ionicons name="time-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
				<Text style={styles.labelText}>{time}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	meeting: {
		gap: Spacing.xs,
	},

	label: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.xs,
	},

	labelText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.textSecondary,
	},
});
