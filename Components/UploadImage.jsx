import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
// import React from "react";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
// import * as dbApi from "../utils/dbApi";
import * as utils from "../utils/utils";

const width = Dimensions.get("window").width;

const UploadImage = ({ imageUri, setImageUri }) => {
  // const [imageUri, setImageUri] = useState(null);
  const [permission, setPermission] = useState(false);
  // const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      } else {
        setPermission(true);
      }
    })();
    pickImage();
  }, []);

  const pickImage = () => {
    utils
      .takePicture()
      .then((result) => {
        if (!result.assets[0].cancelled) {
          console.log("uploadImg", result.assets[0].uri);
          setImageUri(result.assets[0].uri);
        }
      })
      // remove Possible Unhandled Promise Rejection warnings
      .catch((error) => {
        console.log("pickImage", error);
      });
  };

  return (
    <View>
      {/* <Text style={styles.text}>UploadImage</Text> */}
      {/* <Button title="Retake Picture" onPress={pickImage} /> */}
      {imageUri !== "no photo" && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Retake Picture" onPress={pickImage} />
        </>
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 0,
    marginBottom: 0,
    alignSelf: "center",
  },
  view: { padding: 0 },
});
