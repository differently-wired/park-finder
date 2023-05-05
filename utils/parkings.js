import { FIRESTORE_DB } from '../firebaseConfig'
import { Timestamp, collection, doc, addDoc, setDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'

export async function addParking(parkObj) {
  // uid
  // datetime
  // city
  // latitude
  // longitude
  // action
  // duration
  // reminder
  // notes
  // pcitureUrl

  const parkRef = collection(FIRESTORE_DB, 'parkings')
  const parkDoc = {
    ...parkObj,
    timestamp: Timestamp.now(),
  };
  const { id } = await addDoc(parkRef, parkDoc);

  const userRef = doc(FIRESTORE_DB, 'user_list', parkObj.uid);
  await setDoc(
    userRef,
    { activeParking: parkObj.action == 1 },
    { merge: true }
  );

  const userParkRef = doc(
    userRef,
    'parking_hist',
    id
  )
  await setDoc(userParkRef, parkDoc);

  return { id, ...parkDoc };
}

export async function getUserParkedCar(uid) {

  const userParkRef = collection(
    FIRESTORE_DB,
    'user_list',
    uid,
    'parking_hist'
  );

  const q = query(
    userParkRef,
    orderBy("timestamp"),
    limit(1)
  );

  return getDocs(q)
    .then((querySnap) => {
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