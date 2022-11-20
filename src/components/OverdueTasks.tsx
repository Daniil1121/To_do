import React, { useState } from "react";
import { ITask } from "../utils/interfaces";
import Task from "./Task";

type ICompletedTasksProps = { OverdueTasksArray: ITask[] } & {
  setSelectedTask: (task: ITask) => void;
};

const OverdueTasks = ({
  OverdueTasksArray,
  setSelectedTask,
}: ICompletedTasksProps): React.ReactElement => {
  const [showTasks, setShowTasks] = useState<boolean>(true);

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

export default OverdueTasks;
