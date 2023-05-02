import { setDoc, doc } from "@firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

export const createUserAccount = async (email, password, username) => {
  // create user account
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

  const uid = FIREBASE_AUTH.currentUser.uid;

  // create user document
  const docRef = doc(FIRESTORE_DB, "user_list", uid);
  const data = { username: username };
  await setDoc(docRef, data);

  //update display name
  await updateProfile(FIREBASE_AUTH.currentUser, {
    displayName: username,
  });

  // create parking info sub document
  const parkingRef = doc(
    FIRESTORE_DB,
    "user_list",
    uid,
    "parking_info",
    "parking_info"
  );
  await setDoc(parkingRef, { activeParking: false });
};
