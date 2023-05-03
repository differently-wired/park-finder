import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UploadImage from "../Components/UploadImage";

const ParkedCarForm = () => {
  return (
    <View>
      <Text>ParkedCarForm</Text>
      <UploadImage />
      <Text>Form incoming</Text>
    </View>
  );
};

export default ParkedCarForm;

const styles = StyleSheet.create({});
