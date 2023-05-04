import { setDoc, doc, getDoc } from "@firebase/firestore";
import {
  FIREBASE_AUTH,
  FIRESTORE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

// create user account and user document ---------------------------------------
export const createUserAccount = async (uid, username) => {
  // create user document
  const docRef = doc(FIRESTORE_DB, "user_list", uid);
  const data = {
    username: username,
    defaultParkTime: 60,
    defaultAlertBefore: 5,
    activeParking: false,
  };
  await setDoc(docRef, data);
  return data;
  // create parking info sub document
  // const parkingRef = doc(
  //   FIRESTORE_DB,
  //   "user_list",
  //   uid,
  //   "parking_info",
  //   "parking_info"
  // );
  // await setDoc(parkingRef, { activeParking: false });
};

export const getUserAccount = async (uid) => {
  const userRef = doc(FIRESTORE_DB, "user_list", uid);
  return getDoc(userRef).then((userSnap) => {
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return Promise.reject({ error: "User not found" });
    }
  });
};

// Upload image to firebase storage --------------------------------------------
export const uploadParkedCarImageToStorage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const fileName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  const imageRef = ref(FIREBASE_STORAGE, `parked_cars/${fileName}`);
  await uploadBytes(imageRef, blob);
};
