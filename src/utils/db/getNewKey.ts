import { getDatabase, ref, push, DatabaseReference } from "firebase/database";

const getNewKey = (
  setNewKey: React.Dispatch<React.SetStateAction<DatabaseReference | undefined>>
) => {
  const db = getDatabase();
  const postListRef = ref(db, "task");
  const newPostRef = push(postListRef);
  setNewKey(newPostRef);
};

export default getNewKey;
