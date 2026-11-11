// this will define a class meeting
// aka the info for meeting times/location based on the day of the week

export interface ClassMeeting {
	day: number; // 0-6, sunday-saturday
	startTime: string;
	endTime: string;
	building: string;
	room: string;
}
