import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import { MapTemplate } from "../templates/map-template";
import * as Location from "expo-location";

export default function TomTomMaps() {
  // webRef to be used for scroller
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [carLocation, setCarLocation] = useState({});

  useEffect(() => {
    // get user location
    (async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = currentLocation.coords;
      setUserLocation({ longitude, latitude });
    })();

    // get pinned car location
    // TODO change this to get the pinned location from the database
    // If there is no pinned location. DO NOT set this and marker will not appear.
    // EXAMPLE: setCarLocation({ longitude: -2.697894, latitude: 53.553993 });
  }, []);

  let text = "Waiting...";
  if (userLocation) {
    text = JSON.stringify(userLocation);
  }

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
        source={{
          html: MapTemplate(userLocation, carLocation),
        }}
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
  marker: {
    width: 22,
    height: 22,
  },
});
