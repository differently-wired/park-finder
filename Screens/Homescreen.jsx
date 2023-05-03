import * as React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Homescreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello world</Text>

      {/* temp button to test image upload */}
      <Button
        title="Take Picture"
        onPress={() => navigation.navigate("UploadImage")}
      />
      {/* --------------------------------- */}
    </View>
  );
}
