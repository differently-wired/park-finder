import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";

export function ParkingFormModal(props) {
  const { notes, setNotes } = props;
  const [visibleModal, setVisibleModal] = useState(null);
  const [newNote, setNewNote] = useState("");

  const saveNote = () => {
    setNotes(notes.concat(newNote));
    setNewNote("");
    setVisibleModal(null);
  };

  const _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.noteText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const _renderModalContent = () => (
    <View style={styles.modalContent}>
      <TextInput
        placeholder="Enter note"
        value={newNote}
        onChangeText={(text) => setNewNote(text)}
        style={styles.input}
      />
      <View style={styles.modalForm}>
        {_renderButton("Cancel", () => setVisibleModal(null))}
        {_renderButton("Submit", saveNote)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text></Text> */}

      {_renderButton("Add Note", () => setVisibleModal(4))}

      <Modal isVisible={visibleModal === 4}>{_renderModalContent()}</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  button: {
    // backgroundColor: "lightblue",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    // marginRight: 8,
  },
  modalForm: { flexDirection: "row" },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.0)",
  },
  input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    // marginTop: 25,
    // padding: 55,
  },
  noteText: {
    fontSize: 18,
    color: "#6c21dc",
  },
});
