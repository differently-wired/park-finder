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
  Dimensions,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";
import {
  useGoogleAuth,
  signInWithGoogle,
  signInWithEmail,
} from "../utils/auth";
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
        console.log("user", user);
        setUserInfo({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: user.username,
          defaultParkTime: user.defaultParkTime,
          defaultAlertBefore: user.defaultAlertBefore,
          activeParking: user.activeParking,
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
          createUserAccount(firebaseUser.uid, firebaseUser.displayName),
        ]);
      })
      .then(([firebaseUser, _]) => {
        onSuccess(firebaseUser);
      })
      .catch((error) => onFailure(error));
  }, [accessToken]);

  const handleSignIn = () => {
    signInWithEmail(email.trim(), password)
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
            secureTextEntry
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
      <View style={styles.pageLink}>
        <Text>Dont have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={styles.signIn}>Sign Up</Text>
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
    // width: Dimensions.get("window"),
    // height: Dimensions.get("window"),
  },
  heading: { color: "black", fontSize: 40, margin: 20 },
  user: {
    justifyContent: "center",
    textAlign: "center",
  },
  Input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 25,
    // padding: 55,
  },
  inputContainer: {
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
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
  pageLink: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  signIn: {
    color: "#24a0ed",
    fontWeight: "bold",
  },
});

export default SignIn;
