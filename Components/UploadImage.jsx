import { Text, View, Button, Image, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { ImageUriContext } from "../contexts/ParkedCarUri";
import * as ImagePicker from "expo-image-picker";
import * as dbApi from "../utils/dbApi";
import * as utils from "../utils/utils";
import { useNavigation } from "@react-navigation/native";

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [permission, setPermission] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  // const { imageUri, setImageUri } = useContext(ImageUriContext);

  const navigation = useNavigation();

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

  useEffect(() => {
    if (uploaded) {
      alert("Image uploaded!");
    }
  }, [uploaded]);

  const pickImage = () => {
    utils.takePicture().then((result) => {
      if (!result.assets[0].cancelled) {
        setImageUri(result.assets[0].uri);
      }
    });
  };

  const uploadImagePress = async () => {
    try {
      await dbApi.uploadParkedCarImageToStorage(imageUri);
      setUploaded(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View>
      <Text style={styles.text}>UploadImage</Text>
      <Button title="Retake Picture" onPress={pickImage} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button
            title="This will upload image, but need form submit too"
            onPress={uploadImagePress}
          />
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
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
});
