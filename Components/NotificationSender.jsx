import React, { useEffect } from "react";
import { Button, View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "expo-notifications";

const NotificationSender = () => {
  useEffect(() => {
    Notifications.registerForPushNotificationsAsync().then((token) =>
      console.log(token)
    );
  }, []);

  const handleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My Notification Title",
        body: "My Notification Message",
        data: { myData: "data" },
      },
      trigger: { seconds: 5 },
    });
  };

  return (
    <View>
      <Text>Click the button to send a notification in 5 seconds:</Text>
      <Button title="Send Notification" onPress={handleNotification} />
    </View>
  );
};

export default NotificationSender;
