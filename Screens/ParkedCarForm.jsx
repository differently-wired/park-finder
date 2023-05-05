import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useContext, useState } from "react";
import UploadImage from "../Components/UploadImage";
import { getCurrentDateTime } from "../utils/utils";
import { ParkingFormModal } from "../Components/Modals/ParkingFormModal";

const ParkedCarForm = () => {
  // const { userInfo } = useContext(UserInfoContext);
  const [duration, setDuration] = useState("60");
  const [reminder, setReminder] = useState("5");
  const [notes, setNotes] = useState("");

  return (
    <KeyboardAvoidingView>
      <Text>ParkedCarForm</Text>
      {/* <UploadImage /> */}
      <Text>Form incoming {getCurrentDateTime()}</Text>
      <Text>I'm going to park</Text>
      <Picker
        selectedValue={duration}
        onValueChange={(itemValue, itemIndex) =>
          setDuration(itemValue)
        }
      >
        <Picker.Item label="30 minutes" value="30" />
        <Picker.Item label="1 hour" value="60" />
        <Picker.Item label="2 hours" value="120" />
        <Picker.Item label="3 hours" value="180" />
      </Picker>
      <Text>Remind me</Text>
      <Picker
        selectedValue={reminder}
        onValueChange={(itemValue, itemIndex) =>
          setReminder(itemValue)
        }
      >
        <Picker.Item label="5 minutes before" value="5" />
        <Picker.Item label="10 minutes before" value="10" />
        <Picker.Item label="15 minutes before" value="15" />
        <Picker.Item label="30 minutes before" value="30" />
      </Picker>
      <ParkingFormModal notes={notes} setNotes={setNotes} />

    </KeyboardAvoidingView>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({});
