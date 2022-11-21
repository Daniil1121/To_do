import { getDatabase, ref, push, DatabaseReference } from "firebase/database";

/**
 * Функция создания и установки сгенерированного для задачи ключа
 * @memberof Clien_Server_Function
 * @param {React.Dispatch<React.SetStateAction<DatabaseReference | undefined>>} setNewKey - функция Dispacth из useState для установки сгенерированного для задачи ключа
 */

const getNewKey = (
  setNewKey: React.Dispatch<React.SetStateAction<DatabaseReference | undefined>>
) => {
  const db = getDatabase();
  const postListRef = ref(db, "task");
  const newPostRef = push(postListRef);
  setNewKey(newPostRef);
};

export default getNewKey;
