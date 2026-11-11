// this will define what a class is and what info it stores

import { ClassMeeting } from "./ClassMeeting";

export interface Class {
	id: number;
	course_code: string;
	meetings: ClassMeeting[];
}
