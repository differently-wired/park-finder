import { useState, useEffect } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

import UploadImage from "../Components/UploadImage";
import { getCurrentDateTime } from "../utils/utils";
import { ParkingFormModal } from "../Components/Modals/ParkingFormModal";

const ParkedCarForm = () => {
  // notes data
  const [notes, setNotes] = useState("");

  // location data
  const [userLocation, setUserLocation] = useState({});

  // notification data
  const [duration, setDuration] = useState("60");
  const [reminder, setReminder] = useState("5");

  // get user location
  useEffect(() => {
    (async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = currentLocation.coords;
      setUserLocation({ longitude, latitude });
    })();
  }, []);

  // set up notifications
  // TODO: add this into handle submit
  const triggerNotifications = async () => {
    const durationInSeconds = parseInt(duration) * 60;
    const reminderInSeconds = parseInt(reminder) * 60;
    let triggerTime = 2;
    if (durationInSeconds - reminderInSeconds > 0) {
      triggerTime = durationInSeconds - reminderInSeconds;
    }
    console.log(triggerTime);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Park Find & Remind",
        body: "It's time to return to your parking spot!",
        data: { data: "Parking is due to expire in 15 minutes" },
      },
      trigger: { seconds: triggerTime },
    });
  };

  const handleSubmit = () => {
    triggerNotifications();
    // TODO: put all the submit stuff here
  };

  return (
    <KeyboardAvoidingView>
      <Text>ParkedCarForm</Text>
      <UploadImage />
      <Text>Form incoming {getCurrentDateTime()}</Text>
      <Text>I'm going to park</Text>
      <Picker
        selectedValue={duration}
        onValueChange={(itemValue) => setDuration(itemValue)}
      >
        <Picker.Item label="30 minutes" value="30" />
        <Picker.Item label="1 hour" value="60" />
        <Picker.Item label="2 hours" value="120" />
        <Picker.Item label="3 hours" value="180" />
      </Picker>
      <Text>Remind me</Text>
      <Picker
        selectedValue={reminder}
        onValueChange={(itemValue) => setReminder(itemValue)}
      >
        <Picker.Item label="5 minutes before" value="5" />
        <Picker.Item label="10 minutes before" value="10" />
        <Picker.Item label="15 minutes before" value="15" />
        <Picker.Item label="30 minutes before" value="30" />
      </Picker>
      <ParkingFormModal notes={notes} setNotes={setNotes} />
      <Button title="Submit" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({});
