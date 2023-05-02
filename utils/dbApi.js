import { setDoc, doc } from "@firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const auth = getAuth();

const handleSignUp = async (email, password, username) => {
  try {
    const makeUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = auth.currentUser.uid;

    const docRef = doc(FIRESTORE_DB, "user_list", uid);

    const data = { username: username };

    await setDoc(docRef, data);

    const parkingRef = doc(
      FIRESTORE_DB,
      "user_list",
      uid,
      "parking_info",
      "parking_info"
    );
    await setDoc(parkingRef, { activeParking: false });
  } catch (err) {
    alert(err);
  }
};

export default handleSignUp;
