// look up sections for a course code in the saved term list

import sections from "../data/sections.json";
import { ClassMeeting } from "../types/ClassMeeting";

export type CourseSection = {
	courseCode: string;
	title: string;
	section: string;
	meetings: ClassMeeting[];
};

// "cop 3503c" and "COP3503C" should match the same class
function sameCourse(typed: string, saved: string) {
	const typedCode = typed.split(" ").join("").toUpperCase();
	const savedCode = saved.split(" ").join("").toUpperCase();
	return typedCode !== "" && typedCode === savedCode;
}

export function findSections(courseCode: string): CourseSection[] {
	const matches: CourseSection[] = [];

	for (const section of sections as CourseSection[]) {
		if (sameCourse(courseCode, section.courseCode)) {
			matches.push(section);
		}
	}

	return matches;
}
