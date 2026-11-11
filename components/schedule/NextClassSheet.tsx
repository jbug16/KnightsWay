// this is a bottom sheet that is on the home page to tell the user what class is next

import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Sizing } from "../../constants/sizing";
import { Spacing } from "../../constants/spacing";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import CircleButton from "../ui/buttons/CircleButton";
import SheetHeader from "../ui/SheetHeader";
import ClassSummary from "./helpers/ClassSummary";

type NextClassSheetProps = {
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
};

export default function NextClassSheet({ isOpen = true, onOpen, onClose }: NextClassSheetProps) {
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
			<View>
				<ClassSummary courseCode="Example123" />
			</View>
			<View style={styles.buttonContainer}>
				<Button variant="secondary" label="Indoor Map" icon="map-outline" />
				<Button variant="primary" label="Navigate" icon="navigate-outline" />
			</View>
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
});
