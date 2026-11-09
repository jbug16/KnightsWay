// manages class information across the app
// let's us only do one sql query for the same data instead of multiple
// like for the classes, the home and schedule screen both need a value so we can just repeat this call
// !!

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getClasses } from "../services/classStorage";
import { Class } from "../types/Class";

type ClassesContextType = {
	classes: Class[];
	refreshClasses: () => Promise<void>;
};

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export function ClassesProvider({ children }: { children: ReactNode }) {
	const [classes, setClasses] = useState<Class[]>([]);

	async function refreshClasses() {
		const currentClasses = await getClasses();
		setClasses(currentClasses);
		console.log("Classes from SQLite:", currentClasses);
	}

	useEffect(() => {
		refreshClasses();
	}, []);

	return (
		<ClassesContext.Provider value={{ classes, refreshClasses }}>
			{children}
		</ClassesContext.Provider>
	);
}

export function useClasses() {
	const context = useContext(ClassesContext);
	if (context === undefined) {
		throw new Error("useClasses must be used within ClassesProvider");
	}
	return context;
}
