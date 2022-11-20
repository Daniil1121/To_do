import { DatabaseReference, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../interfaces";
let STUB = 1;
/**
 * Функция добавляет в базу данных новую ячейку. В случае успеха, обновляется поле задач на клиенте
 * @param task - объект с новой задачей
 * @param newPostRef - ссылка для создания ячейки в базе данных
 * @param setTasks - функция Dispacth из useState для обновления массива тасков на клиенте
 */
STUB = 1;

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
