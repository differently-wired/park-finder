import React from "react";
import { Button, View, Text } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationSender = () => {
  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Park Find & Remind",
        body: "It's time to return to your parking spot!",
        data: { data: "Parking is due to expire in 15 minutes" },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View>
      <Text>Click the button to send a notification in 5 seconds:</Text>
      <Button
        onPress={triggerNotifications}
        title="Trigger Local Notifications"
        color="#841584"
        accessibilityLabel="Trigger Local Notifications"
      />
    </View>
  );
};

export default NotificationSender;
