import { getDatabase, update, ref } from "firebase/database";
import { ITask } from "./../interfaces";

/**
 * Функция удаления или обновления задачи
 * @memberof Clien_Server_Function
 * @param {ITask | null} task - новая задача (может быть null, для удаления задачи)
 * @param {string} id - id изменяемой задачи
 * @param {React.Dispatch<React.SetStateAction<ITask[]>>} setTasks - функция Dispacth из useState для обновления массива задач на клиенте
 */

const updateOrDeleteTask = (
  task: ITask | null,
  id: string,
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
): void => {
  const db = getDatabase();
  const updates = {};
  //@ts-ignore
  updates["/task/" + id] = task;
  console.log(task, id);
  update(ref(db), updates)
    .then(() => {
      if (task) {
        setTasks((prev) => prev.map((item) => (item.id === id ? task : item)));
      } else {
        setTasks((prev) => prev.filter((item) => item.id !== id));
      }
    })
    .catch((error) => {});
};

export default updateOrDeleteTask;
