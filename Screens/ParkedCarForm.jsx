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
import { getCurrentDateTime, triggerNotifications } from "../utils/utils";
import { ParkingFormModal } from "../Components/Modals/ParkingFormModal";
import { addParking } from "../utils/parkings";
import * as Location from "expo-location";

const ParkedCarForm = () => {
  const [uid, setUid] = useState("YI8s1HWBnXPMLar2vWASK1Ctv9A3");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [pictureUrl, setPictureUrl] = useState("https://insure2drive.co.uk/wp-content/uploads/2021/04/parked-car-shutterstock_573830026-copy.jpg");

  const [duration, setDuration] = useState(60);
  const [reminder, setReminder] = useState(5);
  const [notes, setNotes] = useState("");

  // location data
  // const [userLocation, setUserLocation] = useState({});

  // get user location
  useEffect(() => {
    console.log("on form load");
    Location.getCurrentPositionAsync({})
      .then((currentLocation) => {
        console.log('currentLocation', currentLocation.coords);
        console.log('latitude', currentLocation.coords.latitude);
        console.log('longitude', currentLocation.coords.longitude);
        setLatitude(currentLocation.coords.latitude);
        setLongitude(currentLocation.coords.longitude);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
  const handleSubmit = useCallback(() => {
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
    console.log('parkObj', parkObj);

    addParking(parkObj)
      .then((data) => {
        console.log('data', data);
      })
      .catch((error) => {
        console.log('error', error);
      });

    triggerNotifications(duration, reminder);
  }, [duration, reminder, notes, latitude, longitude]);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>

      <Text style={styles.title}>ParkedCarForm</Text>
      <UploadImage />
      <Text style={styles.subtitle}>Form incoming {getCurrentDateTime()}</Text>
      <Text style={styles.label}>I'm going to park</Text>
      <Picker
        selectedValue={duration}
        onValueChange={(itemValue) => setDuration(itemValue)}
        style={styles.picker}
        >
        <Picker.Item label="30 minutes" value={30} />
        <Picker.Item label="1 hour" value={60} />
        <Picker.Item label="2 hours" value={120} />
        <Picker.Item label="3 hours" value={180} />
      </Picker>
      <Text style={styles.label}>Remind me</Text>
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

export default ParkedCarForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
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
