// this is a bottom sheet that is on the home page to tell the user what class is next

import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import { useClasses } from "../../contexts/ClassesContext";
import { Class } from "../../types/Class";
import { ClassMeeting } from "../../types/ClassMeeting";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import CircleButton from "../ui/buttons/CircleButton";
import SheetHeader from "../ui/SheetHeader";
import ClassSummary from "./helpers/ClassSummary";

// convert string time to real int
function minutes(time: string) {
	const [hour, minute] = time.split(":").map(Number);
	return hour * 60 + minute;
}

// find the next class on the same day
function findNextMeeting(classes: Class[], now: Date) {
	const today = now.getDay();
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	let next: { courseCode: string; meeting: ClassMeeting } | null = null;

	for (const item of classes) {
		for (const meeting of item.meetings) {
			if (meeting.day !== today || minutes(meeting.endTime) <= nowMinutes) {
				continue;
			}
			if (next === null || meeting.startTime < next.meeting.startTime) {
				next = { courseCode: item.course_code, meeting };
			}
		}
	}

	return next;
}

type NextClassSheetProps = {
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
};

export default function NextClassSheet({ isOpen = true, onOpen, onClose }: NextClassSheetProps) {
	const { classes } = useClasses();
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const next = findNextMeeting(classes, now);

	if (!isOpen) {
		return (
			<View style={styles.container}>
				<View style={styles.sheet}>
					<SheetHeader
						title="Next Class"
						onPress={onOpen}
						button={
							<CircleButton
								icon="chevron-up"
								bgColor={Colors.primary}
								iconColor={Colors.black}
								size={Sizing.buttonHeight}
								onPress={onOpen}
							/>
						}
					/>
				</View>
			</View>
		);
	}
	return (
		<BottomSheet
			title="Next Class"
			onHeaderPress={onClose}
			button={
				<CircleButton
					icon="chevron-down"
					bgColor={Colors.surface}
					iconColor={Colors.black}
					size={Sizing.buttonHeight}
					onPress={onClose}
				/>
			}
		>
			{next ? (
				<View>
					<ClassSummary courseCode={next.courseCode} meetings={[next.meeting]} />
					<View style={styles.buttonContainer}>
						<Button variant="secondary" label="Indoor Map" icon="map-outline" />
						<Button variant="primary" label="Navigate" icon="navigate-outline" />
					</View>
				</View>
			) : (
				<Text style={styles.emptyText}>YAY! No more classes today!!</Text>
			)}
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	sheet: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: Colors.white,
		borderTopLeftRadius: Sizing.radiusLarge,
		borderTopRightRadius: Sizing.radiusLarge,
		borderColor: Colors.border,
		borderWidth: Sizing.borderThin,
		padding: Spacing.base,
	},

	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},

	emptyText: {
		fontFamily: Fonts.regular,
		fontSize: Typography.body,
		color: Colors.textSecondary,
	},
});
