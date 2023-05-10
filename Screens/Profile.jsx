import { StyleSheet, Text, View, Image } from "react-native";
import { useContext } from "react";

import { UserInfoContext } from "../contexts/UserInfo";

const Profile = () => {
  const { userInfo } = useContext(UserInfoContext);
  const { defaultParkDuration, defaultReminder, email, username } = userInfo;

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        source={{
          uri: "https://pbs.twimg.com/profile_images/993587234187161601/vTY3pvko_400x400.jpg",
        }}
      />
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
