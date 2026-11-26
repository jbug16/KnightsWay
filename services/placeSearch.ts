// look up buildings and parking by the text the user typed

import buildings from "../data/buildings.json";

export type Place = {
	code: string;
	name: string;
	latitude: number;
	longitude: number;
	type?: string;
	hours?: string;
	permit?: string;
};

// "garage b" and "GARAGE B" should match "Parking Garage B"
// "cb1" should match the code CB1
function nameMatches(typed: string, place: Place) {
	const query = typed.trim().toLowerCase();
	if (query === "") {
		return false;
	}

	const name = place.name.toLowerCase();
	const code = place.code.toLowerCase();
	return name.includes(query) || code.includes(query);
}

export function findPlaces(query: string): Place[] {
	const matches: Place[] = [];

	for (const place of buildings as Place[]) {
		if (nameMatches(query, place)) {
			matches.push(place);
		}
	}

	return matches;
}
