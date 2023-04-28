import { addDoc, collection } from "@firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export const testPost = async () => {
  const doc = await addDoc(collection(FIRESTORE_DB, "Test"), {
    test: RonniePickering,
  });
};
