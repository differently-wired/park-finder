import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

import { UserInfoProvider } from "./contexts/UserInfo";
import AppNavigation from "./navigation/AppNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const getNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== "granted") {
        const { lastStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = lastStatus;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    };
    const getLocationPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = status;
      if (status !== "granted") {
        const { lastStatus } =
          await Location.requestForegroundPermissionsAsync();
        finalStatus = lastStatus;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get location permissions!");
        return;
      }
    };
    getNotificationPermissions();
    getLocationPermissions();
  }, []);

  return (
    <UserInfoProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserInfoProvider>
  );
}
