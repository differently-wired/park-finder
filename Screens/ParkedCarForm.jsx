import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState, useCallback, useEffect } from "react";
import UploadImage from "../Components/UploadImage";
import { getCurrentDateTime } from "../utils/utils";
import { ParkingFormModal } from "../Components/Modals/ParkingFormModal";
import { addParking } from "../utils/parkings";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import TimePicker from "../Components/TimePicker";

const ParkedCarForm = () => {
  const [uid, setUid] = useState("YI8s1HWBnXPMLar2vWASK1Ctv9A3");
  const [latitude, setLatitude] = useState(53.487311);
  const [longitude, setLongitude] = useState(-2.228192802761345);
  const [pictureUrl, setPictureUrl] = useState(
    "https://insure2drive.co.uk/wp-content/uploads/2021/04/parked-car-shutterstock_573830026-copy.jpg"
  );

  const [duration, setDuration] = useState(60);
  const [reminder, setReminder] = useState(5);
  const [notes, setNotes] = useState("");

  // location data
  const [userLocation, setUserLocation] = useState({});

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

  const handleSubmit = useCallback(() => {
    triggerNotifications();

    console.log("creating parking object again ...");

    const parkObj = {
      uid,
      latitude,
      longitude,
      duration,
      reminder,
      notes,
      pictureUrl,
      action: 1,
    };
    console.log("parkObj", parkObj);

    addParking(parkObj)
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [duration, reminder, notes]);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        {/* <Text style={styles.title}>ParkedCarForm</Text> */}
        <UploadImage />
        {/* <Text style={styles.subtitle}>
          Form incoming {getCurrentDateTime()}
        </Text> */}
        <Text style={styles.label}>Parking Duration</Text>
        <Picker
          selectedValue={duration}
          onValueChange={(itemValue) => setDuration(itemValue)}
          style={styles.picker}
        >
          {/* <TimePicker /> */}
          <Picker.Item label="30 minutes" value={30} />
          <Picker.Item label="1 hour" value={60} />
          <Picker.Item label="2 hours" value={120} />
          <Picker.Item label="3 hours" value={180} />
        </Picker>
        <Text style={styles.label}>Set Reminder</Text>
        <Picker
          selectedValue={reminder}
          onValueChange={(itemValue) => setReminder(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="5 minutes before" value={5} />
          <Picker.Item label="10 minutes before" value={10} />
          <Picker.Item label="15 minutes before" value={15} />
          <Picker.Item label="30 minutes before" value={30} />
        </Picker>
        <ParkingFormModal notes={notes} setNotes={setNotes} />
        <Button title="Submit" style={styles.button} onPress={handleSubmit} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: 150,
  },
});

export default ParkedCarForm;
