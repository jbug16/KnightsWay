// the time and room under a class
// meetings that share a time and room are shown once, with the days listed together

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { Fonts } from "../../../constants/fonts";
import { Sizing } from "../../../constants/sizing";
import { Spacing } from "../../../constants/spacing";
import { Typography } from "../../../constants/typography";
import { ClassMeeting } from "../../../types/ClassMeeting";

const days = ["U", "M", "T", "W", "R", "F", "S"];

type MeetingLineProps = {
	meetings: ClassMeeting[];
};

type MeetingGroup = {
	days: number[];
	startTime: string;
	endTime: string;
	building: string;
	room: string;
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

// group the meeting times if they are on the same day so we don't display repeating info
function groupMeetings(meetings: ClassMeeting[]): MeetingGroup[] {
	const groups = new Map<string, MeetingGroup>();

	for (const meeting of meetings) {
		const key = [meeting.startTime, meeting.endTime, meeting.building, meeting.room].join("|");
		let group = groups.get(key);
		if (!group) {
			group = {
				days: [],
				startTime: meeting.startTime,
				endTime: meeting.endTime,
				building: meeting.building,
				room: meeting.room,
			};
			groups.set(key, group);
		}
		if (!group.days.includes(meeting.day)) {
			group.days.push(meeting.day);
		}
	}

	for (const group of groups.values()) {
		group.days.sort((a, b) => a - b);
	}

	return [...groups.values()];
}

export default function MeetingLine({ meetings }: MeetingLineProps) {
	return (
		<View style={styles.list}>
			{groupMeetings(meetings).map((group) => {
				const dayLabel = group.days.map((day) => days[day]).join("");
				const time = dayLabel + " " + to12Hour(group.startTime) + " - " + to12Hour(group.endTime);
				const place = group.building + ", Room " + group.room;

				return (
					<View key={time + place} style={styles.meeting}>
						<View style={styles.label}>
							<Ionicons
								name="location-outline"
								size={Sizing.iconSmall}
								color={Colors.textSecondary}
							/>
							<Text style={styles.labelText} numberOfLines={1}>
								{place}
							</Text>
						</View>
						<View style={styles.label}>
							<Ionicons name="time-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
							<Text style={styles.labelText} numberOfLines={1}>
								{time}
							</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		gap: Spacing.sm,
	},

	meeting: {
		gap: Spacing.xs,
	},

	label: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.xs,
	},

	labelText: {
		flexShrink: 1,
		fontFamily: Fonts.regular,
		fontSize: Typography.secondary,
		color: Colors.textSecondary,
	},
});
