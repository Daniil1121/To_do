import React, { useCallback, useEffect, useState } from "react";
import CompletedTasks from "./CompletedTasks";
import Task from "./Task";
import dayjs from "dayjs";
import ruLocale from "dayjs/locale/ru";
import Portal from "./Portal";
import PopUp from "./PopUp";
import OverdueTasks from "./OverdueTasks";
import RightBar from "./RightBar";
import getAllTask from "./../utils/db/getAllTask";
import { DatabaseReference } from "firebase/database";
import updateOrDeleteTask from "../utils/db/updateOrDeleteTask";
import { ITask } from "../utils/interfaces";
import sortTask from "../utils/sortTask";
import addNewTask from "../utils/db/AddNewTask";

/**
 * @namespace Task_List_Component
 */

/**
 * Компонент, используемый для отображения списка задач
 * @memberof Task_List_Component
 * @type {React.FC}
 * @returns {React.ReactElement} - список задач
 */

const TaskList = (): React.ReactElement => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [popUpToggle, setPopUpToggle] = useState<boolean>(false);

  useEffect(() => {
    getAllTask(setTasks);
  }, []);

  const [overdueTasksArray, completedTasksArray, activeTask] = sortTask(tasks);
  /**
   * callback для запуска процесса создания задачи
   * @memberof Task_List_Component
   * @param {ITask} task - тело новой задачи
   * @param {DatabaseReference} newPostRef - ссылка на базу данных
   */
  const AddNewTaskHandler = useCallback(
    (task: ITask, newPostRef: DatabaseReference) => {
      addNewTask(task, newPostRef, setTasks);
    },
    [tasks]
  );
  /**
   * callback для запуска процесса обновления задачи
   * @memberof Task_List_Component
   * @param {ITask | null} task - тело новой задачи или null для удаления задачи
   * @param {string} id - id задачи
   */
  const updateOrDeleteTaskHandler = useCallback(
    (task: ITask | null, id: string): void => {
      updateOrDeleteTask(task, id, setTasks);
    },
    [tasks]
  );
  /**
   * функция включения/выключения отображения popup
   * @memberof Task_List_Component
   */
  const popUpToogleHandler = useCallback((): void => {
    setPopUpToggle((prev) => !prev);
  }, [tasks]);
  /**
   * блок с активными задачами
   * @memberof Task_List_Component
   */
  const ACTIVE_TASK = activeTask.map((item: ITask) => (
    <Task
      setSelectedTask={setSelectedTask}
      updateOrDeleteTaskHandler={updateOrDeleteTaskHandler}
      key={item.id}
      id={item.id}
      completed={item.completed}
      title={item.title}
      date={item.date}
      description={item.description}
      files={item.files || []}
    />
  ));

  return (
    <>
      <div className="task_area">
        <span className="today_date">
          {dayjs().locale(ruLocale).format("dddd, DD MMMM")}
        </span>
        <div className="task_list">
          {ACTIVE_TASK}
          {!!completedTasksArray.length && (
            <CompletedTasks
              setSelectedTask={setSelectedTask}
              updateOrDeleteTaskHandler={updateOrDeleteTaskHandler}
              completedTasksArray={completedTasksArray}
            />
          )}

          {!!overdueTasksArray.length && (
            <OverdueTasks
              setSelectedTask={setSelectedTask}
              OverdueTasksArray={overdueTasksArray}
            />
          )}
        </div>

        <div onClick={popUpToogleHandler} className="add_button">
          +
        </div>
        {popUpToggle && (
          <Portal>
            <PopUp
              popUpToogleHandler={popUpToogleHandler}
              AddNewTaskHandler={AddNewTaskHandler}
            />
          </Portal>
        )}
      </div>

      {selectedTask && (
        <RightBar
          updateOrDeleteTaskHandler={updateOrDeleteTaskHandler}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
    </>
  );
};

export default TaskList;
