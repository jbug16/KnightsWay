// handle saving and retrieving class info

import * as SQLite from "expo-sqlite";

import { Class } from "../types/Class";
import { ClassMeeting } from "../types/ClassMeeting";

// add class
export async function addClass(courseCode: string, meetings: ClassMeeting[]) {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	// excute an sql statement
	// which in this case is insert an item (aka a class) to the "classes" table
	// add a new row into the table (classes)
	// fill the column course_code with the data VALUES or just put ? if nothing there
	const result = await db.runAsync("INSERT INTO classes (course_code) VALUES (?)", [courseCode]);
	const classId = result.lastInsertRowId;

	// for each meeting...
	for (const meeting of meetings) {
		// insert the meeting info into a new row
		await db.runAsync(
			`INSERT INTO class_meetings
				(class_id, day, start_time, end_time, building_code, room_number)
			 VALUES (?, ?, ?, ?, ?, ?)`,
			[classId, meeting.day, meeting.startTime, meeting.endTime, meeting.building, meeting.room],
		);
	}

	// return the id of the new class we created
	return classId;
}

type ClassRow = {
	id: number;
	course_code: string;
	day: number | null;
	start_time: string | null;
	end_time: string | null;
	building_code: string | null;
	room_number: string | null;
};

const CLASS_WITH_MEETINGS = `
	SELECT
		c.id,
		c.course_code,
		m.day,
		m.start_time,
		m.end_time,
		m.building_code,
		m.room_number
	FROM classes c
	LEFT JOIN class_meetings m ON m.class_id = c.id
`;

function rowsToClasses(rows: ClassRow[]): Class[] {
	const byId = new Map<number, Class>();

	for (const row of rows) {
		let current = byId.get(row.id);
		if (!current) {
			current = { id: row.id, course_code: row.course_code, meetings: [] };
			byId.set(row.id, current);
		}
		if (row.day != null && row.start_time && row.end_time && row.building_code && row.room_number) {
			current.meetings.push({
				day: row.day,
				startTime: row.start_time,
				endTime: row.end_time,
				building: row.building_code,
				room: row.room_number,
			});
		}
	}

	return [...byId.values()];
}

// get all classes
export async function getClasses() {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	const rows = await db.getAllAsync<ClassRow>(
		`${CLASS_WITH_MEETINGS} ORDER BY c.course_code, m.day;`,
	);
	return rowsToClasses(rows);
}

// get a class based on the course code
export async function getClass(courseCode: string) {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	const rows = await db.getAllAsync<ClassRow>(
		`${CLASS_WITH_MEETINGS} WHERE c.course_code = ? ORDER BY m.day;`,
		[courseCode],
	);
	return rowsToClasses(rows)[0] ?? null;
}
