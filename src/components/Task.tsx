import React, { memo, useState } from "react";
import dayjs from "dayjs";
import ruLocale from "dayjs/locale/ru";
import { ITask } from "./../utils/interfaces";

type ITaskProps = {
  setSelectedTask: (task: ITask) => void;
} & ITask & { overdue?: boolean } & {
    updateOrDeleteTaskHandler: (task: ITask | null, id: string) => void;
  };

const Task = ({
  title,
  description,
  date,
  completed,
  id,
  overdue = false,
  files,
  updateOrDeleteTaskHandler = () => {},
  setSelectedTask,
}: ITaskProps): React.ReactElement => {
  const toogleCompleteTaskHandler = (e: React.MouseEvent): void => {
    e.stopPropagation();
    updateOrDeleteTaskHandler(
      { title, description, date, completed: !completed, id, files },
      id
    );
  };

  return (
    <div
      onClick={() =>
        setSelectedTask({ title, description, date, completed, id, files })
      }
      className={`task${completed || overdue ? " completed" : ""}`}
    >
      <div
        onClick={toogleCompleteTaskHandler}
        className={`complete_marker${completed || overdue ? " completed" : ""}`}
      ></div>
      <div className="content">
        <h4>{title}</h4>
        <p className="description">{description}</p>
        <p>
          {dayjs(date).locale(ruLocale).format("H:mm, DD MMM")}{" "}
          {!!files?.length && <span className="files">{files.length}</span>}
        </p>
      </div>
    </div>
  );
};

export default Task;
