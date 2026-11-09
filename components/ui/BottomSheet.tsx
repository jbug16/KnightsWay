// a template for a bottom panel

import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import { Typography } from "../../constants/typography";
import CircleButton from "./CircleButton";

type BottomSheetProps = {
	title?: string;
	onClose?: () => void;
	showHandle?: boolean;
	children: ReactNode;
};

export default function BottomSheet({
	title,
	onClose,
	showHandle = false,
	children,
}: BottomSheetProps) {
	return (
		<View style={styles.container}>
			<Pressable
				style={styles.backdrop}
				onPress={onClose}
				disabled={!onClose}
				accessibilityRole="button"
				accessibilityLabel="Close"
			/>
			<View style={styles.sheet}>
				{showHandle ? <View style={styles.handle} /> : null}
				{title ? (
					<>
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
						<View style={styles.divider} />
					</>
				) : null}
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

	handle: {
		alignSelf: "center",
		width: 36,
		height: 4,
		borderRadius: Sizing.radiusSmall,
		backgroundColor: Colors.textSecondary,
		opacity: 0.35,
		marginBottom: Spacing.md,
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
