import { addDoc, collection } from "@firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const auth = getAuth();

export const testPost = async () => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    "bigknucksron@pickingfights.co.uk",
    "doyouwantsome"
  );
  const user = userCredential.user.email;
  console.log(user);
  const doc = await addDoc(collection(FIRESTORE_DB, "Test"), {
    test: "RonniePickering",
    userCredentials: user,
  });
};

// Example object from signup form to post to Users
// { email: 'bigRon@knuckles.com', password: 'bigKnucks' }
