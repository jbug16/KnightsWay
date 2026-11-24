// this is the popup/sheet that comes up to add or edit a class

import { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

import { Spacing } from "../../constants/spacing";
import { useClasses } from "../../contexts/ClassesContext";
import { addClass } from "../../services/classStorage";
import { CourseSection, findSections } from "../../services/sectionSearch";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/buttons/Button";
import TextField from "../ui/TextField";
import SectionRow from "./SectionRow";

type ClassFormProps = {
	visible: boolean;
	onClose: () => void;
};

export default function ClassForm({ visible, onClose }: ClassFormProps) {
	const { refreshClasses } = useClasses();
	const [courseCode, setCourseCode] = useState("");
	const [sections, setSections] = useState<CourseSection[]>([]);
	const [picked, setPicked] = useState<CourseSection | null>(null);
	const [confirming, setConfirming] = useState(false);

	// what happens when we close the modal
	const handleClose = () => {
		// reset all values, dont save them
		setCourseCode("");
		setSections([]);
		setPicked(null);
		setConfirming(false);
		onClose();
	};

	function handleFindSections() {
		if (courseCode.trim() === "") {
			alert("Course code is required");
			return;
		}

		const found = findSections(courseCode);
		if (found.length === 0) {
			alert("No sections found for this term.");
			return;
		}

		setSections(found);
		setPicked(null);
		setConfirming(false);
	}

	async function handleAddClass() {
		if (picked === null) {
			return;
		}

		// insert the data to the db
		await addClass(picked.courseCode, picked.section, picked.meetings);
		// refresh the page
		await refreshClasses();
		// close the form
		handleClose();
	}

	let title = "Add class";
	if (confirming) {
		title = "Confirm section";
	} else if (sections.length > 0) {
		title = sections[0].courseCode;
	}

	return (
		<Modal visible={visible} transparent={true} onRequestClose={handleClose}>
			<BottomSheet title={title} onClose={handleClose}>
				{sections.length === 0 ? (
					<View style={styles.fields}>
						<TextField
							label="Course code"
							value={courseCode}
							onChangeText={setCourseCode}
							placeholder="COP 3503"
						/>
						<View style={styles.buttonContainer}>
							<Button variant="primary" label="Find sections" onPress={handleFindSections} />
						</View>
					</View>
				) : null}

				{sections.length > 0 && !confirming ? (
					<View style={styles.fields}>
						<ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
							{sections.map((section) => (
								<SectionRow
									key={section.section}
									section={section}
									selected={picked === section}
									onPress={() => setPicked(section)}
								/>
							))}
						</ScrollView>
						<View style={styles.buttonContainer}>
							<Button
								variant={picked === null ? "secondary" : "primary"}
								label="Review section"
								onPress={() => {
									if (picked !== null) {
										setConfirming(true);
									}
								}}
							/>
						</View>
					</View>
				) : null}

				{confirming && picked !== null ? (
					<View style={styles.fields}>
						<SectionRow section={picked} selected={true} />
						<View style={styles.buttonContainer}>
							<Button variant="secondary" label="Back" onPress={() => setConfirming(false)} />
							<Button variant="primary" label="Add class" onPress={handleAddClass} />
						</View>
					</View>
				) : null}
			</BottomSheet>
		</Modal>
	);
}

const styles = StyleSheet.create({
	fields: {
		gap: Spacing.lg,
	},

	list: {
		maxHeight: 320,
	},

	listContent: {
		gap: Spacing.md,
	},

	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.md,
		paddingTop: Spacing.base,
	},
});
