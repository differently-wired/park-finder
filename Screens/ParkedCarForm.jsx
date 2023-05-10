import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
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

const fullHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const height = Platform.OS === "ios" ? "padding" : "height";

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
    console.log("parkObj", parkObj);

    // 1) save to db
    addParking(parkObj)
      .then((data) => {
        console.log("data", data);
        console.log("Going to set notifications");
        // 2) set notifications
        return triggerNotifications(duration, reminder);
      })
      .then(() => {
        console.log("Going to upload image");
        // 3) upload image
        return uploadParkedCarImageToStorage(imageUri);
      })
      .then(() => {
        console.log("Going to home screen");
        // 4) go back to home screen
        setUserInfo((current) => {
          return { ...current, activeParking: true };
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [uid, duration, reminder, notes, latitude, longitude, imageUri]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageContainer}>
        <UploadImage imageUri={imageUri} setImageUri={setImageUri} />
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerColumn}>
          <Text style={styles.label}>Parking Duration</Text>
          <Picker
            selectedValue={duration}
            onValueChange={(itemValue) => setDuration(itemValue)}
            style={styles.leftPicker}
          >
            <Picker.Item label="30 mins" value={30} />
            <Picker.Item label="1 hour" value={60} />
            <Picker.Item label="2 hours" value={120} />
            <Picker.Item label="3 hours" value={180} />
          </Picker>
        </View>
        <View style={styles.pickerColumn}>
          <Text style={styles.label}>Parking Reminder</Text>
          <Picker
            selectedValue={reminder}
            onValueChange={(itemValue) => setReminder(itemValue)}
            style={styles.rightPicker}
          >
            <Picker.Item label="5 mins" value={5} />
            <Picker.Item label="10 mins" value={10} />
            <Picker.Item label="15 mins" value={15} />
            <Picker.Item label="30 mins" value={30} />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ParkingFormModal notes={notes} setNotes={setNotes} />
        {/* <Button
          title="Submit"
          // style={styles.submitButton}
          onPress={handleSubmit}
        /> */}
      </View>
      {/* <TextInput
        placeholder="add a note..."
        // value={email}
        // onChangeText={(text) => setEmail(text)}
        style={styles.Input}
        multiline={true}

      /> */}
      {/* <Button
          title="Submit"
          style={styles.submitB}
          // color="#6C21DC"
          onPress={() => {
            onPress = { handleSubmit };
          }}
        /> */}
      {/* <Button
        title="Submit"
        style={styles.submitButton}
        onPress={handleSubmit}
      /> */}
      <TouchableOpacity
        style={{
          backgroundColor: "#017bfe",
          width: width,
          alignItems: "center",
        }}
        onPress={handleSubmit}
      >
        <Text
          style={{
            fontSize: 18,
            backgroundColor: "#017bfe",
            color: "white",
            padding: 8,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    // paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    // padding: 0,
    height: 760,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    // borderWidth: 5,
    // borderColor: "black",
  },
  noteContainer: { borderWidth: 5, borderColor: "black" },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignContent: "center",
    // borderColor: "black",
    // borderWidth: 5,
    height: 300,
    width: "100%",
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    width: "100%",
    // borderWidth: 5,
    // borderColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    // marginHorizontal: -200,
  },
  label: {
    fontSize: 18,
    width: 150,
    marginTop: 20,
    // marginBottom: 10,
  },
  rightPicker: {
    width: 150,
    height: 40,
    marginBottom: 20,
  },
  leftPicker: { width: 150, height: 40, marginBottom: 20 },
  submitButton: {
    marginTop: 20,
    width: 150,
  },
  // submitButton: {
  //   backgroundColor: "blue",
  // },
  Input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    // marginTop: 25,
    width: "90%",
    fontSize: 18,
    // padding: 55,
  },
});
