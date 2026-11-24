// this is the little card that tells the user about the class
// used to display all classes and the upcoming class

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../../constants/colors";
import { Fonts } from "../../../constants/fonts";
import { Sizing } from "../../../constants/sizing";
import { Spacing } from "../../../constants/spacing";
import { Typography } from "../../../constants/typography";
import { ClassMeeting } from "../../../types/ClassMeeting";
import Tag from "../../ui/Tag";
import MeetingLine from "./MeetingLine";

type ClassSummaryProps = {
	showTag?: boolean;
	courseCode?: string;
	meetings?: ClassMeeting[];
};

// convert string time to real
function minutes(time: string) {
	const [hour, minute] = time.split(":").map(Number);
	return hour * 60 + minute;
}

// determine how many mins til the next class
function tagLabel(startTime: string, now: Date) {
	const remaining = minutes(startTime) - (now.getHours() * 60 + now.getMinutes());
	if (remaining <= 0) {
		return "Now";
	}
	if (remaining < 60) {
		return remaining === 1 ? "In 1 min" : `In ${remaining} mins`;
	}

	const hours = Math.floor(remaining / 60);
	const leftover = remaining % 60;
	const hourLabel = hours === 1 ? "1 hr" : `${hours} hr`;
	if (leftover === 0) {
		return `In ${hourLabel}`;
	}
	return `In ${hourLabel} ${leftover} min`;
}

export default function ClassSummary({ showTag = true, courseCode, meetings }: ClassSummaryProps) {
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		if (!showTag) {
			return;
		}
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, [showTag]);

	const nextStart = meetings?.reduce<string | null>((earliest, meeting) => {
		if (earliest === null || meeting.startTime < earliest) {
			return meeting.startTime;
		}
		return earliest;
	}, null);
	const tagText = showTag && nextStart ? tagLabel(nextStart, now) : null;

	return (
		<View style={styles.container}>
			{/* icon */}
			<View style={styles.classIcon}>
				<Ionicons name="school" size={Sizing.iconLarge} color={Colors.black} />
			</View>
			{/* course code */}
			<View style={styles.classInfo}>
				<View style={styles.classHeader}>
					<Text style={styles.classCode}>{courseCode}</Text>
					{tagText ? <Tag text={tagText} /> : null}
				</View>
				{meetings ? (
					<MeetingLine meetings={meetings} />
				) : (
					<>
						{/* location */}
						<View style={styles.label}>
							<Ionicons
								name="location-outline"
								size={Sizing.iconSmall}
								color={Colors.textSecondary}
							/>
							<Text style={styles.labelText}>CB1, Room 101</Text>
						</View>
						{/* time */}
						<View style={styles.label}>
							<Ionicons name="time-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
							<Text style={styles.labelText}>10:30 AM - 11:45 AM</Text>
						</View>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
	},

	classIcon: {
		width: Sizing.iconBackground,
		height: Sizing.iconBackground,
		backgroundColor: Colors.primary,
		borderRadius: Sizing.radiusMedium,
		alignItems: "center",
		justifyContent: "center",
	},

	classInfo: {
		flex: 1,
		gap: Spacing.xs,
	},

	classCode: {
		fontFamily: Fonts.semibold,
		fontSize: Typography.body,
		color: Colors.text,
	},

	classHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: Spacing.sm,
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
