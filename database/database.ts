
import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync("knightsway.db");

    // enable foreign key enforcement
    await db.execAsync('PRAGMA foreign_keys = ON;');

    // stores the buildings
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS buildings (
            id INTEGER PRIMARY KEY,
            building_code TEXT NOT NULL UNIQUE,
            building_name TEXT NOT NULL
        );
    `);

    // stores the classes the student is taking
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY,
            course_code TEXT NOT NULL,
            course_name TEXT
        );
    `);

    // stores the room information
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY,
            building_id INTEGER NOT NULL,
            room_number TEXT NOT NULL,
            floor INTEGER NOT NULL,

            FOREIGN KEY (building_id) REFERENCES buildings(id),
            UNIQUE (building_id, room_number)
        );
    `);

    // stores the class meeting information
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS class_meetings (
            id INTEGER PRIMARY KEY,
            class_id INTEGER NOT NULL,
            day INTEGER NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            building_id INTEGER,
            room_number TEXT,

            FOREIGN KEY (class_id) REFERENCES classes(id),
            FOREIGN KEY (building_id) REFERENCES buildings(id)
        );
    `);

    return db;
}
