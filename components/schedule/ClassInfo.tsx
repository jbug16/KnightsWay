import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import Tag from "../ui/Tag";

type ClassInfoProps = {
	showTag?: boolean;
};

export default function ClassInfo({ showTag = true }: ClassInfoProps) {
	return (
		<View style={styles.container}>
			{/* icon */}
			<View style={styles.classIcon}>
				<Ionicons name="school" size={Sizing.iconLarge} color={Colors.black} />
			</View>
			{/* course code */}
			<View style={styles.classInfo}>
				<View style={styles.classHeader}>
					<Text style={styles.classCode}>COP 3503</Text>
					{/* time left til class label */}
					{showTag ? <Tag text="In 20 mins" /> : null}
				</View>
				{/* location */}
				<View style={styles.label}>
					<Ionicons name="location-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
					<Text style={styles.labelText}>Classroom Building I, Room 101</Text>
				</View>
				{/* time */}
				<View style={styles.label}>
					<Ionicons name="time-outline" size={Sizing.iconSmall} color={Colors.textSecondary} />
					<Text style={styles.labelText}>10:30 AM - 11:45 AM</Text>
				</View>
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
