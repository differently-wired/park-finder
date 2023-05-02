import * as React from "react";
import { Text, View, Image } from "react-native";
import { UserInfoContext } from "../contexts/UserInfo";

export default function Homescreen() {
  const { userInfo } = React.useContext(UserInfoContext);
  console.log("userInfo", userInfo);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold" }}>Hello</Text>
      <Text>{userInfo.username}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: userInfo.picture }}
        alt={userInfo.name}
      />
    </View>
  );
}
