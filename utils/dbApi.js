import { setDoc, doc } from "@firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export const createUserAccount = async (uid, username) => {
  // create user document
  const docRef = doc(FIRESTORE_DB, "user_list", uid);
  const data = { 
    username: username,
    defaultParkTime: 60,
    defaultAlertBefore: 6,
  };
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
