import { getDatabase, ref, get, child } from "firebase/database";
import { ITask } from "./../interfaces";

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
