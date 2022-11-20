import React, { useState } from "react";
import { ITask } from "../utils/interfaces";
import Task from "./Task";

type ICompletedTasksProps = {
  updateOrDeleteTaskHandler: (task: ITask | null, id: string) => void;
} & {
  setSelectedTask: (task: ITask) => void;
} & { completedTasksArray: ITask[] };

const CompletedTasks = ({
  completedTasksArray,
  updateOrDeleteTaskHandler,
  setSelectedTask,
}: ICompletedTasksProps): React.ReactElement => {
  const [showTasks, setShowTasks] = useState<boolean>(true);

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
