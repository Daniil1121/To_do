import { DatabaseReference, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../interfaces";

const AddNewTask = (
  task: ITask,
  newPostRef: DatabaseReference,
  setTasks: Dispatch<SetStateAction<ITask[]>>
) => {
  set(newPostRef, task)
    .then(() => setTasks((prev) => [task, ...prev]))
    .catch((error) => {});
};

export default AddNewTask;
