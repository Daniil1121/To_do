import React, { memo, useState } from "react";
import dayjs from "dayjs";
import ruLocale from "dayjs/locale/ru";
import { ITask, ITaskProps } from "./../utils/interfaces";

/**
 * @namespace Task_Component
 */

/**
 * @interface ITaskProps
 * @property {ITask} task - задача
 * @property {function} updateOrDeleteTaskHandler - функция для обновления или удаления задачи
 * @property {function}  setSelectedTask - функция для открытия правого бара
 */

/**
 * Компонент, используемый для отображения задачи
 * @memberof Task_Component
 * @type {React.FC}
 * @returns {React.ReactElement} - блок задачи
 * @param {ITaskProps} props - Входные данные компонента
 */

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
  /**
   * функция при клике запускает обновление задачи, меняя флаг completed на противоположный
   * @param {React.MouseEvent} event - событие клика мыши
   */
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
