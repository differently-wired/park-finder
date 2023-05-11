import { StyleSheet, Text, View, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../contexts/UserInfo";
import UploadProfilePic from "../Components/UploadProfilePic";
import {
  uploadProfileImageToStorage,
  updateUserProfileURL,
} from "../utils/dbApi";
import { getProfileImageFromStorage } from "../utils/dbApi";
import { FIREBASE_AUTH } from "../firebaseConfig";

export const Profile = () => {
  const { userInfo } = useContext(UserInfoContext);
  const { defaultParkDuration, defaultReminder, email, username } = userInfo;
  const [imageUri, setImageUri] = useState(FIREBASE_AUTH.currentUser.photoURL);

  // useEffect(() => {
  //   fetchProfileImage();
  // }, []);

  // const fetchProfileImage = async () => {
  //   try {
  //     const userImageUri = await getProfileImageFromStorage();
  //     setImageUri(userImageUri);
  //   } catch (error) {
  //     console.log("Error getting profile image:", error);
  //   }
  // };
  const handleImage = async (uri) => {
    console.log(uri);
    try {
      setImageUri(uri);
      await uploadProfileImageToStorage(uri);
      await updateUserProfileURL(uri);
    } catch (error) {
      console.log("Error uploading profile image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        source={{
          uri: imageUri,
        }}
      />
      <UploadProfilePic onImageSelect={handleImage} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Default Park Duration</Text>:{" "}
        {defaultParkDuration} minutes
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Default Reminder</Text>: {defaultReminder}{" "}
        minutes
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#6c21dc",
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
});
