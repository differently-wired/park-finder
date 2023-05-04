import { FIRESTORE_DB } from '../firebaseConfig'
import { Timestamp, collection, doc, addDoc, setDoc } from 'firebase/firestore'

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