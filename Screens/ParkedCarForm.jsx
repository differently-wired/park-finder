import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UploadImage from "../Components/UploadImage";
// import NotificationSender from "../Components/NotificationSender";

const ParkedCarForm = () => {
  return (
    <View>
      <Text>ParkedCarForm</Text>
      <UploadImage />
      {/* <NotificationSender /> */}
      <Text>Form incoming</Text>
    </View>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({});
