import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";

import { Class } from "../../types/Class";
import ClassSummary from "./ClassSummary";

type ClassRowProps = {
	item: Class;
};

export default function ClassRow({ item }: ClassRowProps) {
	return (
		<View style={styles.card}>
			<View style={styles.cardInfo}>
				<ClassSummary courseCode={item.course_code} showTag={false} />
			</View>
			<Ionicons name="chevron-forward" size={Sizing.iconMed} color={Colors.textSecondary} />
		</View>
	);
}

const styles = StyleSheet.create({
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
