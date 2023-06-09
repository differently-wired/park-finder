import { FIRESTORE_DB } from "../firebaseConfig";
import {
  Timestamp,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function addParking(parkObj) {
  console.log("Add Parking", parkObj.uid);


  const parkRef = doc(FIRESTORE_DB, "parkings", parkObj.uid);
  const parkDoc = {
    ...parkObj,
    timestamp: Timestamp.now(),
  };
  await setDoc(parkRef, parkDoc);

  const userRef = doc(FIRESTORE_DB, "users_list", parkObj.uid);
  await updateDoc(userRef, { activeParking: parkObj.action == 1 });

  const userParkRef = doc(
    FIRESTORE_DB,
    "users_list",
    parkObj.uid,
    "parking_hist",
    "parking_hist"
  );
  
  await setDoc(userParkRef, parkDoc);

  return { userParkRef, ...parkDoc };
}

export async function getUserParkedCar(uid) {
  console.log("Get user parked car", uid);

  const userParkRef = collection(
    FIRESTORE_DB,
    "users_list",
    uid,
    "parking_hist"
  );

  const q = query(userParkRef, orderBy("timestamp", "desc"), limit(1));

  return getDocs(q).then((querySnap) => {
    if (querySnap.docs.length === 0) {
      return Promise.reject("No parking history found");
    }
    const data = querySnap.docs[0].data();
    if (data.action !== 1) {
      return Promise.reject("User car is not parked");
    }
    return data;
  });
}
