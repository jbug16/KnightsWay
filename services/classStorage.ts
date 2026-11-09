// handle saving and retrieving class info

import * as SQLite from "expo-sqlite";

// add class
export async function addClass(courseCode: string) {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	// excute an sql statement
	// which in this case is insert an item (aka a class) to the "classes" table
	// add a new row into the table (classes)
	// fill the column course_code with the data VALUES or just put ? if nothing there
	// [courseCode] is the input
	const result = await db.runAsync("INSERT INTO classes (course_code) VALUES (?)", [courseCode]);

	// return the id of the new class we created
	return result.lastInsertRowId;

	// we can call this like: await addClass('COP 3503');
}

// get all classes
export async function getClasses() {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	// select all (*) from the classes table and sort by the course code
	return await db.getAllAsync<{
		id: number;
		course_code: string;
	}>("SELECT * FROM classes ORDER BY course_code;");
}

// get a class based on the course code
export async function getClass(courseCode: string) {
	// open our database
	const db = await SQLite.openDatabaseAsync("knightsway.db");

	// select one class from the classes table based on the course code
	return await db.getAllAsync<{
		id: number;
		course_code: string;
	}>("SELECT id, course_code FROM classes WHERE course_code = ?;", [courseCode]);
}
