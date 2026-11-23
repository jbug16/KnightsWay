// a template for a bottom panel

import { ReactNode, useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import CloseButton from "./buttons/CloseButton";
import SheetHeader from "./SheetHeader";

type BottomSheetProps = {
	title?: string;
	button?: ReactNode;
	onHeaderPress?: () => void;
	onClose?: () => void;
	children: ReactNode;
};

export default function BottomSheet({
	title,
	button,
	onHeaderPress,
	onClose,
	children,
}: BottomSheetProps) {
	const headerButton = button ?? (onClose ? <CloseButton onPress={onClose} /> : null);
	// move the sheet up while the keyboard is open
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const show = Keyboard.addListener("keyboardDidShow", (event) => {
			setKeyboardHeight(event.endCoordinates.height);
		});
		const hide = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardHeight(0);
		});
		return () => {
			show.remove();
			hide.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.backdrop}
				onPress={onClose}
				disabled={!onClose}
				accessibilityRole="button"
				accessibilityLabel="Close"
			/>
			<View style={[styles.sheet, { bottom: keyboardHeight }]}>
				{title ? (
					<>
						<SheetHeader title={title} button={headerButton} onPress={onHeaderPress} />
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

	divider: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: Spacing.md,
	},
});
