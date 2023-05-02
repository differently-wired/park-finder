import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export const useGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "514293633890-qm6c45uin32i28r56ltmgheja4j311e6.apps.googleusercontent.com",
  })
  let accessToken = null;
  if (!response || response.type != "success") {
    return [request, null, promptAsync];
  }

  console.log('response', response);
  accessToken = response.authentication.accessToken;
  return [request, accessToken, promptAsync];
}

export const getUserInfo = (accessToken) => {
  return fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((body) => body.json());
}

export const signInFirebase = (accessToken) => {
  const credential = GoogleAuthProvider.credential(null, accessToken);
  console.log('credential', credential);
  return signInWithCredential(FIREBASE_AUTH, credential)
    .then((result) => result.user);
}
