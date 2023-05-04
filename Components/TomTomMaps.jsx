import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import { MapTemplate } from "../templates/map-template";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function TomTomMaps() {
  // webRef to be used for scroller
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [marker, setMarker] = useState([
    {
      id: 1,
      title: "SVG icon",
      description: "This is an SVG marker",
      icon: require("../assets/favicon.png"),
      latlng: {
        latitude: 42.73919549715691,
        longitude: -120.72217631449985,
      },
    },
  ]);

  useEffect(() => {
    setMarker((marker) => {
      const { longitude, latitude } = location;
      console.log(location);
      const updatedCoords = {
        ...marker,
      };

      console.log(updatedCoords, "<<<<<cords update ");
      console.log(marker, "marker");
    });
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = location.coords;
      setLocation({ longitude, latitude });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
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
      {/* <WebView
                ref={(r) => (webRef = r)}
                onMessage={handleMapEvent}
                style={styles.map}
                originWhitelist={["*"]}
                source={MapTemplate}
                location={location}
            /> */}
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{
          html: MapTemplate(location),
        }}
      />
      <Marker />
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

  market: {
    width: 22,
    height: 22,
  },
});
