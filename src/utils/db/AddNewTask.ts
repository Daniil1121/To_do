import { DatabaseReference, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../interfaces";

/**
 * @namespace Clien_Server_Function
 */
/**
 * Функция добавляет в базу данных новую ячейку. В случае успеха, обновляется поле задач на клиенте
 * @memberof Clien_Server_Function
 * @param {ITask} task - объект с новой задачей
 * @param {DatabaseReference} newPostRef - ссылка для создания ячейки в базе данных
 * @param {React.Dispatch<React.SetStateAction<ITask[]>>} setTasks - функция Dispacth из useState для обновления массива тасков на клиенте
 */

const addNewTask = (
  task: ITask,
  newPostRef: DatabaseReference,
  setTasks: Dispatch<SetStateAction<ITask[]>>
) => {
  set(newPostRef, task)
    .then(() => setTasks((prev) => [task, ...prev]))
    .catch((error) => {});
};

export default addNewTask;
