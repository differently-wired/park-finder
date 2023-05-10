import { setDoc, doc, getDoc } from "@firebase/firestore";
import {
  FIRESTORE_DB,
  FIREBASE_STORAGE,
  FIREBASE_AUTH,
} from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// create user account and user document ---------------------------------------
export const createUserAccount = async (uid, username) => {
  console.log("Creating user account", uid)
  // create user document
  const docRef = doc(FIRESTORE_DB, "users_list", uid);
  const data = {
    username: username,
    defaultParkDuration: 60,
    defaultReminder: 5,
    activeParking: false,
  };
  await setDoc(docRef, data);
  return data;
  // create parking info sub document
  // const parkingRef = doc(
  //   FIRESTORE_DB,
  //   "users_list",
  //   uid,
  //   "parking_info",
  //   "parking_info"
  // );
  // await setDoc(parkingRef, { activeParking: false });
};

export const getUserAccount = async (uid) => {
  console.log("Getting user account", uid)
  const userRef = doc(FIRESTORE_DB, "users_list", uid);
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
  const uid = FIREBASE_AUTH.currentUser.uid;
  const imageRef = ref(FIREBASE_STORAGE, `parked_cars/${uid}/parked_car.jpg`);
  await uploadBytes(imageRef, blob);
};

// Get image from firebase storage --------------------------------------------
export const getParkedCarImageFromStorage = async () => {
  const uid = FIREBASE_AUTH.currentUser.uid;
  const imageRef = ref(FIREBASE_STORAGE, `parked_cars/${uid}/parked_car.jpg`);
  const url = await getDownloadURL(imageRef);
  return url;
};
