import React from "react";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationButton() {
  const handlePress = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to send notifications was denied");
      return;
    }

    Notifications.scheduleNotificationAsync({
      content: {
        title: "There is an item that almost due!",
        body: "Please check you items right now!",
      },
      trigger: null,
    });
  };

  return (
    <View>
      <Button title="Send Notification" onPress={handlePress} />
    </View>
  );
}
