import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import mapTemplate from "../templates/map-template";
import Device from "expo-location";
import * as Location from "expo-location";

export default function App() {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //   const onButtonPress = () => {
  //     const [lng, lat] = mapCenter.split(",");
  //     webRef.injectJavaScript(
  //       `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`
  //     );
  //   };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        ></TextInput>
      </View>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: mapTemplate }}
        // initialRegion={{
        //   latitude: 53.480759,
        //   longitude: -2.242631,
        //   latitudeDelta: 0.0622,
        //   longitudeDelta: 0.0121,
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "85%",
  },
  map: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
});
