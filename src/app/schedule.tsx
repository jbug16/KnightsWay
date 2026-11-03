import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ClassInfo from "../../components/ClassInfo";
import FilterChip from "../../components/FilterChip";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";

export default function ScheduleScreen() {
	return (
		<SafeAreaView style={styles.container} edges={["top"]}>
			<View style={styles.header}>
				<Text style={styles.title}>My Schedule</Text>
				<View style={styles.addButton}>
					<Ionicons name="add" size={Sizing.iconMed} color={Colors.black} />
				</View>
			</View>

			<View style={styles.filterContainer}>
				<FilterChip label="Mon" selected />
				<FilterChip label="Tue" />
				<FilterChip label="Wed" />
				<FilterChip label="Thu" />
				<FilterChip label="Fri" />
			</View>

			<View style={styles.list}>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>
				<View style={styles.card}>
					<View style={styles.cardInfo}>
						<ClassInfo showTag={false} />
					</View>
					<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
				</View>
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

	addButton: {
		width: Sizing.buttonHeight,
		height: Sizing.buttonHeight,
		borderRadius: Sizing.buttonHeight,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},

	filterContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.sm,
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
