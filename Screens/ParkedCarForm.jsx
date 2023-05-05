import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import UploadImage from "../Components/UploadImage";
import { getCurrentDateTime } from "../utils/utils";

const ParkedCarForm = () => {
  const [duration, setDuration] = useState(60);
  const [reminder, setReminder] = useState(5);
  const [notes, setNotes] = useState("");

  return (
    <KeyboardAvoidingView>
      <Text>ParkedCarForm</Text>
      {/* <UploadImage /> */}
      <Text>Form incoming {getCurrentDateTime()}</Text>
      <TextInput
        placeholder="Parking Duration"
        value={duration}
        onChangeText={(text) => setDuration(text)}
        // style={styles.Input}
      />
    </KeyboardAvoidingView>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({});
