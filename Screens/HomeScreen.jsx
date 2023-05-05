import * as React from "react";
import { Button, View } from "react-native";
import TomTomMaps from "../Components/TomTomMaps";
import { UserInfoContext } from "../contexts/UserInfo";
import { useContext } from "react";

export default function Homescreen() {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TomTomMaps />
    </View>
  );
}
