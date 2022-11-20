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
import { set, DatabaseReference } from "firebase/database";
import updateOrDeleteTask from "../utils/db/updateOrDeleteTask";
import AddNewTask from "../utils/db/AddNewTask";
import { ITask } from "../utils/interfaces";
import sortTask from "../utils/sortTask";

const TaskList = (): React.ReactElement => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [popUpToggle, setPopUpToggle] = useState<boolean>(false);

  useEffect(() => {
    getAllTask(setTasks);
  }, []);

  const [overdueTasksArray, completedTasksArray, activeTask] = sortTask(tasks);

  const AddNewTaskHandler = useCallback(
    (task: ITask, newPostRef: DatabaseReference) => {
      AddNewTask(task, newPostRef, setTasks);
    },
    [tasks]
  );

  const updateOrDeleteTaskHandler = useCallback(
    (task: ITask | null, id: string): void => {
      updateOrDeleteTask(task, id, setTasks);
    },
    [tasks]
  );

  const popUpToogleHandler = useCallback((): void => {
    setPopUpToggle((prev) => !prev);
  }, [tasks]);

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
        <span>{dayjs().locale(ruLocale).format("dddd, DD MMMM")}</span>
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
