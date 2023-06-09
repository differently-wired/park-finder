import { setDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import {
  FIRESTORE_DB,
  FIREBASE_STORAGE,
  FIREBASE_AUTH,
} from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

// create user account and user document ---------------------------------------
export const createUserAccount = async (uid, username) => {
  console.log("Creating user account", uid);
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

// Get user account ---------------------------------------------------------

export const getUserAccount = async (uid) => {
  console.log("Getting user account", uid);
  const userRef = doc(FIRESTORE_DB, "users_list", uid);
  return getDoc(userRef).then((userSnap) => {
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return Promise.reject({ error: "User not found" });
    }
  });
};

// Get parkings ---------------------------------------------------------
export const getParkingsDetails = async () => {
  const uid = FIREBASE_AUTH.currentUser.uid;
  const userRef = doc(FIRESTORE_DB, "parkings", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return Promise.reject({ error: "User not found" });
  }
};

//Update user account ---------------------------------------------------------
export const updateUserAccount = async (data) => {
  const uid = FIREBASE_AUTH.currentUser.uid;
  const userRef = doc(FIRESTORE_DB, "users_list", uid);
  await updateDoc(userRef, data);
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
  const uri = await getDownloadURL(imageRef);
  return uri;
};
// Upload profile pic to firebase storage --------------------------------------------
export const uploadProfileImageToStorage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const uid = FIREBASE_AUTH.currentUser.uid;
  const imageRef = ref(FIREBASE_STORAGE, `profile_pics/${uid}/profile_pic.jpg`);
  await uploadBytes(imageRef, blob);
};

// Get profile image from firebase storage --------------------------------------------

export const getProfileImageFromStorage = async () => {
  try {
    const uid = FIREBASE_AUTH.currentUser.uid;
    const imageRef = ref(
      FIREBASE_STORAGE,
      `profile_pics/${uid}/profile_pic.jpg`
    );
    const uri = await getDownloadURL(imageRef);
    return uri;
  } catch (error) {
    return "error";
  }
};

// Update user profileURL ------------------------------------------------------

export const updateUserProfileURL = async (url) => {
  const user = FIREBASE_AUTH.currentUser;
  await updateProfile(user, { photoURL: url });
};

// Check if document exists ----------------------------------------------------

export const checkIfDocumentExists = async (uid) => {
  const userRef = doc(FIRESTORE_DB, "users_list", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};
