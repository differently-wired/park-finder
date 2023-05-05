import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserAccount } from "../utils/dbApi.js";
import { singUpWithEmail } from "../utils/auth.js";
import { UserInfoContext } from "../contexts/UserInfo";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Platform,
  useColorScheme,
} from "react-native";

export default function SignUp() {
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";

  const { setUserInfo } = useContext(UserInfoContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const firebaseUser = await singUpWithEmail(
        email.trim(),
        password,
        username.trim()
      );
      const user = await createUserAccount(firebaseUser.uid, username);
      // console.log('user', user);
      setUserInfo({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...user,
      });
      navigation.navigate("Home Screen");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "*" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.heading}>Sign up</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.Input}
          />
          <TextInput
            placeholder="Display Name"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.Input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.Input}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.Input}
            secureTextEntry
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 53,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "60%",
  },
  Input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 25,
    // padding: 55,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#24a0ed",
  },
  buttonOutlineText: {
    color: "white",
    fontSize: 18,
    // fontWeight: "#24a0ed",
  },
  heading: {
    color: "black",
    fontSize: 40,
    margin: 20,
  },
});
