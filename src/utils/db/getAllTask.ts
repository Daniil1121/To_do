import { getDatabase, ref, get, child } from "firebase/database";
import { ITask } from "./../interfaces";

/**
 * Функция получения массива задач
 * @memberof Clien_Server_Function
 * @param {React.Dispatch<React.SetStateAction<ITask[]>>} setTasks - - функция Dispacth из useState для обновления массива задач на клиенте
 */

const getAllTask = (
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `task`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setTasks(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getAllTask;
