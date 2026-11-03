// this will define what a class is and what info it stores

export interface Class {
	id: string;
	courseCode: string;
	building: string;
	room: string;
	days: number[]; // 0-6 = sunday-saturday
	startTime: string; // 24hr time
	endTime: string;   // 24hr time
}