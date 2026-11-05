import React, { createContext, useContext, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import packagesData from "../data/packages";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import StatusScreen from "../screens/StatusScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import theme from "../theme/colors";

const AppContext = createContext(null);
export function useApp() {
  return useContext(AppContext);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

function TabNavigator() {
  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.paper }]}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
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

  const contextValue = {
    packages: packagesData,
    selectedPackage,
    setSelectedPackage,
    booking,
    setBooking,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
