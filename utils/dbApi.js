import { setDoc, doc } from "@firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export const createUserAccount = async (email, password, username) => {
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

  const uid = FIREBASE_AUTH.currentUser.uid;

  // create user document
  const docRef = doc(FIRESTORE_DB, "user_list", uid);
  const data = { username: username };
  await setDoc(docRef, data);

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
