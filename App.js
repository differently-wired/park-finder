import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import MyStack from "./Routes/MyStack";
import { UserInfoProvider } from "./contexts/UserInfo";

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
    const getPermissions = async () => {
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
    getPermissions();
  }, []);

  return (
    <UserInfoProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserInfoProvider>
  );
}
