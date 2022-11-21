import { ITask } from "./interfaces";
/**
 * функция сортировки списка задач на активные, выполненные и просроченные
 * @param {ITask[]} tasks
 * @returns {ITask[]}
 */
const sortTask = (tasks: ITask[]) => {
  const inactiveTasks: ITask[] = tasks.filter(
    (item) => new Date() > new Date(item.date) || item.completed
  );

  const completedTasksArray: ITask[] = inactiveTasks
    .filter((item) => item.completed)
    .sort((a, b) => {
      return Date.parse(`${b.date}`) - Date.parse(`${a.date}`);
    });

  const overdueTasksArray: ITask[] = tasks
    .filter((item) => !item.completed)
    .filter((item) => new Date() > new Date(item.date))
    .sort((a, b) => {
      return Date.parse(`${b.date}`) - Date.parse(`${a.date}`);
    });

  const activeTask: ITask[] = tasks
    .filter((item) => !item.completed)
    .filter((item) => new Date() <= new Date(item.date))
    .sort((a, b) => {
      return Date.parse(`${b.date}`) - Date.parse(`${a.date}`);
    });

  return [overdueTasksArray, completedTasksArray, activeTask];
};

export default sortTask;
