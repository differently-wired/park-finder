import { Text, View, Button, Image, StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as dbApi from "../utils/dbApi";
import * as utils from "../utils/utils";
import { useNavigation } from "@react-navigation/native";

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [permission, setPermission] = useState(false);
  const [uploaded, setUploaded] = useState(false);

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
      navigation.navigate("HomeScreen");
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
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Retake Picture" onPress={pickImage} />
          {/* <Button
            title="This will upload image, but need form submit too"
            onPress={uploadImagePress}
          /> */}
        </>
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "black",
  // },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 500,
    height: 300,
    // marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
});
