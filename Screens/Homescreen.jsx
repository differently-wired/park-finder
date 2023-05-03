import * as React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TomTomMaps from "../Components/TomTomMaps";
import UploadImage from "../Components/UploadImage";
import NavBar from "../Components/NavBar";

export default function Homescreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavBar />
      <TomTomMaps />
    </View>
  );
}
