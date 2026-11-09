import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Typography } from "../../constants/typography";

// fonts
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

// database
import { useEffect, useState } from "react";
import { initializeDatabase } from "../../database/database";

// provider things
import { ClassesProvider } from "../../contexts/ClassesContext";

// This is the file that does the nav bar
// Using the tabs it creates a bar at the bottom of the screen
// It also links the files in the same folder here to the buttons
// WAY EASIER THAN XML!!!
export default function RootLayout() {
	// wait to show screens until the tables exist, so class loading does not race setup
	const [databaseReady, setDatabaseReady] = useState(false);

	useEffect(() => {
		async function setupDatabase() {
			try {
				await initializeDatabase();
				console.log("Database initialized successfully!");
				setDatabaseReady(true);
			} catch (error) {
				console.error("Database initialization failed:", error);
			}
		}

		setupDatabase();
	}, []);

	// font stuff
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});
	if (!fontsLoaded || !databaseReady) return null;

	// navbar
	return (
		<ClassesProvider>
			<Tabs
				screenOptions={{
					// Tab colors
					tabBarActiveTintColor: Colors.black,
					tabBarInactiveTintColor: Colors.textSecondary,

					// Navbar background
					tabBarStyle: {
						backgroundColor: Colors.white,
						borderTopColor: Colors.border,
					},

					// Tab label font
					tabBarLabelStyle: {
						fontFamily: Fonts.semibold,
						fontSize: Typography.caption,
					},

					headerShown: false,
				}}
			>
				{/* Home screen */}
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
					}}
				/>
				{/* Schedule screen */}
				<Tabs.Screen
					name="schedule"
					options={{
						title: "Schedule",
						tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
					}}
				/>
				{/* Parking screen */}
				<Tabs.Screen
					name="parking"
					options={{
						title: "Parking",
						tabBarIcon: ({ color, size }) => <Ionicons name="car" size={size} color={color} />,
					}}
				/>
				{/* Settings screen */}
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
					}}
				/>
			</Tabs>
		</ClassesProvider>
	);
}
