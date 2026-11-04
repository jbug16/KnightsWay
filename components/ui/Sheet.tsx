// bottom card with a title and a dividing line

import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import CircleButton from "./CircleButton";

type SheetProps = {
	title: string;
	onClose?: () => void;
	children: ReactNode;
};

export default function Sheet({ title, onClose, children }: SheetProps) {
	return (
		<View style={styles.container}>
			<View style={styles.backdrop} />
			<View style={styles.sheet}>
				{/* Top text */}
				<View style={styles.header}>
					<Text style={styles.titleText}>{title}</Text>
					{onClose ? (
						<CircleButton
							icon="close"
							bgColor={Colors.surface}
							iconColor={Colors.black}
							onPress={onClose}
						/>
					) : null}
				</View>
				{/* Dividing line */}
				<View style={styles.divider} />
				{children}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	backdrop: {
		flex: 1,
		backgroundColor: Colors.black,
		opacity: 0.4,
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

	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	titleText: {
		fontSize: Typography.sectionTitle,
		fontFamily: Fonts.bold,
	},

	divider: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: Spacing.md,
	},
});
