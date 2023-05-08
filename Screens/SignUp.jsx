import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserAccount } from "../utils/dbApi.js";
import { singUpWithEmail } from "../utils/auth.js";
import { UserInfoContext } from "../contexts/UserInfo";
import { signUpStyles } from '../Styles/styles.js'
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
        <View style={signUpStyles.inputContainer}>
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
            style={signUpStyles.Input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={signUpStyles.Input}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={signUpStyles.Input}
            secureTextEntry
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={signUpStyles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[signUpStyles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

