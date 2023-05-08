import {
  Text,
  View,
  Image,
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
import {
  useGoogleAuth,
  signInWithGoogle,
  signInWithEmail,
} from "../utils/auth";
import * as WebBrowser from "expo-web-browser";
import { createUserAccount, getUserAccount } from "../utils/dbApi";
import { signInStyles } from '../Styles/styles.js'

WebBrowser.maybeCompleteAuthSession();

function SignIn() {
  const { setUserInfo } = useContext(UserInfoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, accessToken, promptAsync] = useGoogleAuth();
  const navigation = useNavigation();

  function onSuccess(firebaseUser) {
    getUserAccount(firebaseUser.uid)
      .then((user) => {
        // console.log("user", user);
        setUserInfo({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...user,
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
          // don't return, just ignore on any errors
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
      style={signInStyles.container}
    >
      <Text style={signInStyles.heading}>Welcome</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={signInStyles.inputContainer}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={signInStyles.Input}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={signInStyles.Input}
            secureTextEntry
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={signInStyles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[signInStyles.button, signInStyles.buttonOutline]}
        >
          <Text style={signInStyles.buttonOutlineText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
          <View style={signInStyles.GoogleButton}>
            <Image
              style={signInStyles.GoogleImage}
              source={require("../assets/google-img.png")}
            />
            <Text style={signInStyles.GoogleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={signInStyles.pageLink}>
        <Text>Don't have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={signInStyles.signUp}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


export default SignIn;
