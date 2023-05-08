import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState, useCallback } from "react";
import UploadImage from "../Components/UploadImage";
import { getCurrentDateTime } from "../utils/utils";
import { ParkingFormModal } from "../Components/Modals/ParkingFormModal";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Timestamp, collection, doc, addDoc, setDoc, query, orderBy, limit, getDocs } from "firebase/firestore";


const ParkedCarForm = () => {
  const [duration, setDuration] = useState("60");
  const [reminder, setReminder] = useState("5");
  const [notes, setNotes] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      const parkedCarsCollection = collection(FIRESTORE_DB, "parkings");

      const parkDoc = {
        duration,
        reminder,
        notes,
        timestamp: Timestamp.now(),
      };

      const { id } = await addDoc(parkedCarsCollection, parkDoc);



      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }, [duration, reminder, notes]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>ParkedCarForm</Text>
      <UploadImage />
      <Text style={styles.subtitle}>Form incoming {getCurrentDateTime()}</Text>
      <Text style={styles.label}>I'm going to park</Text>
      <Picker
        selectedValue={duration}
        onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="30 minutes" value="30" />
        <Picker.Item label="1 hour" value="60" />
        <Picker.Item label="2 hours" value="120" />
        <Picker.Item label="3 hours" value="180" />
      </Picker>
      <Text style={styles.label}>Remind me</Text>
      <Picker
        selectedValue={reminder}
        onValueChange={(itemValue, itemIndex) => setReminder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="5 minutes before" value="5" />
        <Picker.Item label="10 minutes before" value="10" />
        <Picker.Item label="15 minutes before" value="15" />
        <Picker.Item label="30 minutes before" value="30" />
      </Picker>
      <ParkingFormModal notes={notes} setNotes={setNotes} />
      <Button title="Submit" style={styles.button} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
