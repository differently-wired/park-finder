import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { updateUserAccount } from "../../utils/dbApi";

export function ParkingSessionModal({
  modalVisible,
  setModalVisible,
  setUserInfo,
  userInfo,
}) {
  const handleYesPress = () => {
    setModalVisible(false);
  };

  const handleNoPress = async () => {
    try {
      await updateUserAccount({ activeParking: false });
      await setUserInfo((current) => {
        return { ...current, activeParking: false };
      });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Do you want to continue your last session?{"\n"}</Text>
      <View style={{ flexDirection: "row" }}>
        {_renderButton("Yes", handleYesPress)}
        {_renderButton("No", handleNoPress)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal isVisible={modalVisible === true}>{_renderModalContent()}</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "lightblue",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginRight: 8,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.0)",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    width: "100%",
  },
});
