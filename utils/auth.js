import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "514293633890-qm6c45uin32i28r56ltmgheja4j311e6.apps.googleusercontent.com",
  });
  let accessToken = null;
  if (!response || response.type != "success") {
    return [request, null, promptAsync];
  }
  accessToken = response.authentication.accessToken;
  return [request, accessToken, promptAsync];
};

export const getGoogleUser = (accessToken) => {
  return fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((body) => body.json());
};

export const signInWithGoogle = (accessToken) => {
  const credential = GoogleAuthProvider.credential(null, accessToken);
  return signInWithCredential(FIREBASE_AUTH, credential);
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
};

export const singUpWithEmail = (email, password, username) => {
  // create user account
  return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((credential) => {
      //update display name
      return Promise.all([
        credential.user,
        updateProfile(credential.user, {
          displayName: username,
        }),
      ]);
    })
    .then(([user]) => user);
};
