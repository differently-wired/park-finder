import { setDoc, doc } from "@firebase/firestore";
import {
  FIREBASE_AUTH,
  FIRESTORE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

// create user account and user document ---------------------------------------
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

// Upload image to firebase storage --------------------------------------------
export const uploadParkedCarImageToStorage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const fileName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  const imageRef = ref(FIREBASE_STORAGE, `parked_cars/${fileName}`);
  await uploadBytes(imageRef, blob);
};
