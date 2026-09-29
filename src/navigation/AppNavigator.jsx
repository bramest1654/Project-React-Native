import React, { createContext, useContext, useState, useMemo } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import packagesData from "../data/packages";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import StatusScreen from "../screens/StatusScreen";
import LocationScreen from "../screens/LocationScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import GlassDock from "../components/GlassDock";
import { lightTheme, darkTheme } from "../theme/colors";

const AppContext = createContext(null);
export function useApp() {
  return useContext(AppContext);
}
export function useTheme() {
  return useContext(AppContext).theme;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

function TabNavigator() {
  const theme = useTheme();
  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.paper }]}>
      <Tab.Navigator
        tabBar={(props) => <GlassDock {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Booking" component={BookingScreen} />
        <Tab.Screen name="Status" component={StatusScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default function AppNavigator() {
  const [selectedPackage, setSelectedPackage] = useState(packagesData[0]);
  const [booking, setBooking] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("id");

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const contextValue = useMemo(
    () => ({
      packages: packagesData,
      selectedPackage,
      setSelectedPackage,
      booking,
      setBooking,
      isDarkMode,
      toggleTheme,
      theme,
      language,
      setLanguage,
    }),
    [selectedPackage, booking, isDarkMode, theme, language],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Login — layar pertama sebelum masuk ke tab */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
