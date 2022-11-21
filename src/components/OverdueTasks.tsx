import React, { useState, memo } from "react";
import { IOverdueTasksProps, ITask } from "../utils/interfaces";
import Task from "./Task";

/**
 * @namespace Overdue_Tasks_Component
 */

/**
 * @interface IOverdueTasksProps
 * @property {function} setSelectedTask - функция, которая открывает бар для выбранной задачи
 * @property {ITask[]} OverdueTasksArray - массив просроченных задач
 */

/**
 * Компонент, используемый для отображения просроченных задач
 * @memberof Overdue_Tasks_Component
 * @type {React.FC}
 * @returns {React.ReactElement} - Компоненту, используемую для отображения просроченных задач
 * @param {IOverdueTasksProps} props - Входные данные компоненты
 */
const OverdueTasks = ({
  OverdueTasksArray,
  setSelectedTask,
}: IOverdueTasksProps): React.ReactElement => {
  const [showTasks, setShowTasks] = useState<boolean>(true);
  /**
   * блок, хранящий разметку с просроченными задачами
   * @memberof Overdue_Tasks_Component
   */
  const OVERDUE_TASKS = (
    <div className="completed_task">
      <div
        onClick={() => setShowTasks((prev) => !prev)}
        className="completed_task_point"
      >
        <div className={`arrow${showTasks ? "" : " close"}`}></div>
        Просроченные {OverdueTasksArray.length}
      </div>
      {showTasks &&
        OverdueTasksArray.map((item: ITask) => (
          <Task
            updateOrDeleteTaskHandler={() => {}}
            setSelectedTask={setSelectedTask}
            key={item.id}
            id={item.id}
            completed={item.completed}
            title={item.title}
            description={item.description}
            date={item.date}
            overdue={true}
            files={item.files || []}
          />
        ))}
    </div>
  );

  return <>{OVERDUE_TASKS}</>;
};

export default memo(OverdueTasks);
