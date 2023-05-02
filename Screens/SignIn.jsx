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
import { useGoogle, getUserInfo } from "../helpers/googleAuth";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, token, promptAsyn] = useGoogle();
  const navigation = useNavigation();

  function onSuccess(user) {
    setUserInfo({
      uid: user.id,
      email: user.email,
      family_name: user.family_name,
      given_name: user.given_name,
      name: user.name,
      locale: user.locale,
      picture: user.picture,
    });
    navigation.navigate("HomeScreen");
  }

  useEffect(() => {
    token &&
      getUserInfo(token)
        .then((user) => {
          console.log("user", user);
          onSuccess(user);
        })
        .catch((error) => {
          console.log("error", error);
          alert("Sign In Failed!");
        });
  }, [token]);

  const handleSignIn = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log("Registered with:", user.email);
        // navigation.navigate("HomeScreen");
        // onSuccess(user);
      })
      .catch((error) => alert(error.message));
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
          {/* <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.Input}
          /> */}
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
