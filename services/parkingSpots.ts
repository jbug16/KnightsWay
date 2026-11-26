const spots: Record<string, string> = {};

export function parkingSpots(code: string) {
	return spots[code] ?? "—";
}
