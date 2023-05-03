import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";
import { useGoogleAuth, signInWithGoogle, signInWithEmail } from "../utils/auth";
import * as WebBrowser from "expo-web-browser";
import { createUserAccount, getUserAccount } from "../utils/dbApi";

WebBrowser.maybeCompleteAuthSession();

function SignIn() {
  const { setUserInfo } = useContext(UserInfoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, accessToken, promptAsyn] = useGoogleAuth();
  const navigation = useNavigation();

  function onSuccess(firebaseUser) {
    getUserAccount(firebaseUser.uid)
    .then((user) => {
      setUserInfo({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: user.username,
        defaultParkTime: user.defaultParkTime,
        defaultAlertBefore: user.defaultAlertBefore,
      });
      navigation.navigate("Home Screen");
    })
    .catch((error) => onFailure(error));
  }

  function onFailure(error) {
    console.log(error);
    alert(error);
  }

  useEffect(() => {
    if (!accessToken) return;
    signInWithGoogle(accessToken)
      .then((credential) => {
        const firebaseUser = credential.user;
        return Promise.all([
          firebaseUser,
          createUserAccount(firebaseUser.uid, firebaseUser.displayName)
        ])
      })
      .then(([firebaseUser, _]) => {
        onSuccess(firebaseUser)
      })
      .catch((error) => onFailure(error));
  }, [accessToken]);

  const handleSignIn = () => {
    signInWithEmail(email, password)
      .then((credential) => onSuccess(credential.user))
      .catch((error) => onFailure(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "*" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.heading}>Welcome</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <Text></Text>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.Input}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.Input}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign in</Text>
        </TouchableOpacity>
        <Button
          title="Connect with Google"
          disabled={!request}
          onPress={() => promptAsyn()}
        />
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
  heading: { color: "black", fontSize: 20, margin: 20 },
  user: {
    justifyContent: "center",
    textAlign: "center",
  },
  Input: {
    textAlign: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
  },
  buttonOutlineText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "white",
  },
});

export default SignIn;
