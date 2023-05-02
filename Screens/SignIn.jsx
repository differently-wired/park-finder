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
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useGoogle, getUserInfo, signInFirebase } from "../helpers/googleAuth";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, accessToken, promptAsyn] = useGoogle();
  const navigation = useNavigation();

  function onSuccess(firebaseUser) {
    setUserInfo({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      username: firebaseUser.displayName,
    });
    navigation.navigate("HomeScreen");
  }

  useEffect(() => {
    console.log('accessToken', accessToken)
    accessToken &&
      getUserInfo(accessToken)
        .then((googleUser) => {
          console.log("googleUser", googleUser);
          // sign in to Firebase
          return signInFirebase(accessToken);
        })
        .then((firebaseUser) => {
          console.log("firebaseUser", firebaseUser.user);
          onSuccess(firebaseUser);

          // create firebase account

        })
        .catch((error) => {
          console.log("error", error);
          alert("Sign In Failed!");
        });
  }, [accessToken]);

  const handleSignIn = () => {
    console.log('handleSignIn', email, password);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log('userCredential', userCredential);
        const user = userCredential.user;
        console.log("Signed in as:", user.email);
        onSuccess(user);
      })
      .catch((error) => {
        console.log("error", error);
        alert(error.message)
      });
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
