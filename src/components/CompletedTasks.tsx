import React, { useState } from "react";
import { ICompletedTasksProps, ITask } from "../utils/interfaces";
import Task from "./Task";

/**
 * @namespace Completed_Tasks_Component
 */

/**
 * @interface ICompletedTasksProps
 * @property {function} updateOrDeleteTaskHandler - функция, которая обновляет или удаляет задачу на сервере и клиенте
 * @property {function} setSelectedTask - функция, которая открывает бар для выбранной задачи
 * @property {ITask[]} completedTasksArray - массив выполненных задач
 */

/**
 * @memberof Completed_Tasks_Component
 * @type {React.FC}
 * @returns {React.ReactElement} - Компоненту, используемую для отображения выполненных задач
 * @param {ICompletedTasksProps} props - Входные данные компоненты
 */

const CompletedTasks = ({
  completedTasksArray,
  updateOrDeleteTaskHandler,
  setSelectedTask,
}: ICompletedTasksProps): React.ReactElement => {
  const [showTasks, setShowTasks] = useState<boolean>(true);
  /**
   * блок, хранящий разметку с выполненными задачами
   * @memberof Completed_Tasks_Component
   */
  const COMPLETED_TASKS = (
    <div className="completed_task">
      <div
        onClick={() => setShowTasks((prev) => !prev)}
        className="completed_task_point"
      >
        <div className={`arrow${showTasks ? "" : " close"}`}></div>
        Завершенные {completedTasksArray.length}
      </div>
      {showTasks &&
        completedTasksArray.map((item: ITask) => (
          <Task
            files={item.files || []}
            setSelectedTask={setSelectedTask}
            updateOrDeleteTaskHandler={updateOrDeleteTaskHandler}
            key={item.id}
            id={item.id}
            completed={item.completed}
            title={item.title}
            description={item.description}
            date={item.date}
          />
        ))}
    </div>
  );

  return <>{COMPLETED_TASKS}</>;
};

export default CompletedTasks;
