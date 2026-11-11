// this is the popup/sheet that comes up to add or edit a class

import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import { Spacing } from "../../constants/spacing";
import { useClasses } from "../../contexts/ClassesContext";
import { addClass } from "../../services/classStorage";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import FormField from "../ui/FormField";
import TextField from "../ui/TextField";
import DayChips from "./helpers/DayChips";

type ClassFormProps = {
	visible: boolean;
	onClose: () => void;
};

const dayNumber: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 };

export default function ClassForm({ visible, onClose }: ClassFormProps) {
	// form values
	const { refreshClasses } = useClasses();
	const [courseCode, setCourseCode] = useState("");
	const [building, setBuilding] = useState("");
	const [room, setRoom] = useState("");
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	// what happens when we close the modal
	const handleClose = () => {
		// reset all values, dont save them
		setCourseCode("");
		setBuilding("");
		setRoom("");
		setSelectedDays([]);
		setStartTime("");
		setEndTime("");
		onClose();
	};

	function handleErrors() {
		if (!/^[0-9]+$/.test(room)) {
			alert("Room number must be numbers only");
			return;
		}
		if (courseCode.trim() === "") {
			alert("Course code is required");
			return;
		}
		if (selectedDays.length === 0) {
			alert("Selecting a day is required");
			return;
		}
		// no building/room number or start/end times is okay because the class might be online
	}

	async function handleAddClass() {
		// check for invalid values
		handleErrors();

		// insert the data to the db
		await addClass(
			courseCode,
			selectedDays.map((day) => ({
				day: dayNumber[day],
				startTime,
				endTime,
				building,
				room,
			})),
		);
		// refresh the page
		await refreshClasses();
		// close the form
		handleClose();
	}

	return (
		<Modal visible={visible} transparent={true} onRequestClose={handleClose}>
			<BottomSheet title="Add Class" onClose={handleClose}>
				<View style={styles.fields}>
					<TextField
						label="Course Code"
						value={courseCode}
						onChangeText={setCourseCode}
						placeholder="e.g. COP 1234"
					/>
					<View style={styles.row}>
						<View style={styles.half}>
							<TextField
								label="Building"
								value={building}
								onChangeText={setBuilding}
								placeholder="e.g. Engineering I"
							/>
						</View>
						<View style={styles.half}>
							<TextField label="Room" value={room} onChangeText={setRoom} placeholder="e.g. 104" />
						</View>
					</View>
					<FormField label="Days">
						<DayChips selected={selectedDays} onChange={setSelectedDays} />
					</FormField>
					<View style={styles.row}>
						<View style={styles.half}>
							<TextField
								label="Start Time"
								value={startTime}
								onChangeText={setStartTime}
								placeholder="9:00 AM"
							/>
						</View>
						<View style={styles.half}>
							<TextField
								label="End Time"
								value={endTime}
								onChangeText={setEndTime}
								placeholder="10:15 AM"
							/>
						</View>
					</View>
				</View>
				{/* buttons */}
				<View style={styles.buttonContainer}>
					<Button variant="primary" label="Add Class" onPress={handleAddClass} />
				</View>
			</BottomSheet>
		</Modal>
	);
}

const styles = StyleSheet.create({
	fields: {
		gap: Spacing.lg,
	},

	row: {
		flexDirection: "row",
		gap: Spacing.md,
	},

	half: {
		flex: 1,
	},

	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},
});
