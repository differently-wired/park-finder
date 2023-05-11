import React, { useState, useContext, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";
import {
  useGoogleAuth,
  signInWithGoogle,
  signInWithEmail,
} from "../utils/auth";
import { createUserAccount, getUserAccount } from "../utils/dbApi";
import LoadingScreen from "../Components/Loading_Spinner/Loading.js";
import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

function SignIn() {
  const { setUserInfo } = useContext(UserInfoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, accessToken, promptAsync] = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const navigation = useNavigation();

  function onSuccess(firebaseUser) {
    getUserAccount(firebaseUser.uid)
      .then((user) => {
        setUserInfo({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...user,
        });
        setLoading(false);
        navigation.replace("Home Screen");
      })
      .catch((error) => {
        onFailure(error);
        setLoading(false);
      });
  }

  function onFailure(error) {
    console.log(error);
    alert(error);
  }

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
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
      .catch((error) => {
        onFailure(error);
        setLoading(false);
      });
  }, [accessToken]);

  const handleSignIn = () => {
    setLoading(true);
    signInWithEmail(email.trim(), password)
      .then((credential) => onSuccess(credential.user))
      .catch((error) => {
        onFailure(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (request) {
      setShowGoogleSignIn(true);
    }
  }, [request]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
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
              disabled={loading}
            >
              {loading ? (
                <LoadingScreen />
              ) : (
                <Text style={styles.buttonOutlineText}>Sign in</Text>
              )}
            </TouchableOpacity>
            {showGoogleSignIn && (
              <TouchableOpacity
                disabled={!request}
                onPress={() => promptAsync()}
              >
                <View style={styles.GoogleButton}>
                  <Image
                    style={styles.GoogleImage}
                    source={require("../assets/google-img.png")}
                  />
                  <Text style={styles.GoogleButtonText}>
                    Sign in with Google
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.pageLink}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text style={styles.signUp}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    padding: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#6C21DC",
    marginBottom: 30,
  },
  buttonOutlineText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pageLink: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  signUp: {
    color: "#24a0ed",
    fontWeight: "bold",
  },
  twoButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  GoogleButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  GoogleImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  GoogleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    marginLeft: 10,
  },
});

export default SignIn;

