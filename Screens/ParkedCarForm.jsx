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
import { UserInfoContext } from "../contexts/UserInfo";
import { uploadParkedCarImageToStorage } from "../utils/dbApi";
import { useNavigation } from "@react-navigation/native";


const ParkedCarForm = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [uid] = useState(userInfo.uid);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [imageUri, setImageUri] = useState("no photo");

  const [duration, setDuration] = useState(60);
  const [reminder, setReminder] = useState(5);
  const [notes, setNotes] = useState("");
  const navigation = useNavigation();

  // get user location
  useEffect(() => {
    Location.getCurrentPositionAsync({})
      .then((currentLocation) => {
        setLatitude(currentLocation.coords.latitude);
        setLongitude(currentLocation.coords.longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = useCallback(() => {

    const parkObj = {
      uid,
      latitude,
      longitude,
      duration,
      reminder,
      notes,
      action: 1,
    };
    console.log('parkObj', parkObj);

    // 1) save to db
    addParking(parkObj)
      .then((data) => {
        console.log('data', data);
        console.log('Going to set notifications');
        // 2) set notifications
        return triggerNotifications(duration, reminder);
      })
      .then(() => {
        console.log('Going to upload image');
        // 3) upload image
        return uploadParkedCarImageToStorage(imageUri);
      })
      .then(() => {
        console.log('Going to home screen');
        // 4) go back to home screen
        setUserInfo((current) => { return { ...current, activeParking: true } });
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log('error', error);
      });

  }, [uid, duration, reminder, notes, latitude, longitude, imageUri]);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>

        <Text style={styles.title}>ParkedCarForm</Text>
        <UploadImage imageUri={imageUri} setImageUri={setImageUri} />
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
