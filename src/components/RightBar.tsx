import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddFileComponent from "./AddFileComponent";
import deleteAllFile from "./../utils/db/deleteAllFiles";
import { IFileData, IRightBarProps, ITask } from "./../utils/interfaces";

/**
 * @namespace Right_Bar_component
 */

/**
 * @interface IRightBarProps
 * @property { React.Dispatch<React.SetStateAction<null | ITask>>} setSelectedTask - функция для закрытия бара путём зануления выбранной задачи
 * @property {function} updateOrDeleteTaskHandler - функция для обновления задачи
 * @property {ITask}  selectedTask - выбранная задача
 */

/**
 * Компонент, используемый для создания новой задачи
 * @memberof Right_Bar_component
 * @type {React.FC}
 * @returns {React.ReactElement} - правый бар для управления задачей
 * @param {IRightBarProps} props - Входные данные компонента
 */

const RightBar = ({
  setSelectedTask,
  selectedTask,
  updateOrDeleteTaskHandler,
}: IRightBarProps): React.ReactElement => {
  const closeRightBar = () => {
    setSelectedTask(null);
  };

  const [title, setTitle] = useState<string>(selectedTask.title);
  const [description, setdescription] = useState<string>(
    selectedTask.description
  );
  const [date, setDate] = useState<string>(selectedTask.date);
  const [id, setId] = useState<string>(selectedTask.id);
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<IFileData[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    setTitle(selectedTask.title);
    setdescription(selectedTask.description);
    setDate(selectedTask.date);
    setId(selectedTask.id);
    setFiles(selectedTask.files || []);
  }, [selectedTask]);

  useEffect(() => {
    saveTaskChanges();
  }, [files]);
  /**
   * функция слушатель,отлавливает клик по клавиатуре и устанавливает значение заголовка
   * @memberof Right_Bar_component
   * @param {React.ChangeEvent<HTMLInputElement>} event - событие клика по клавиатуре
   */
  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    setTitle(e.target.value);
  };

  /**
   * функция слушатель,отлавливает клик по клавиатуре и устанавливает значение описания
   * @memberof Right_Bar_component
   * @param {React.ChangeEvent<HTMLInputElement>} event - событие клика по клавиатуре
   */
  const changeDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setError("");
    setdescription(e.target.value);
  };
  /**
   * функция выполняет проверку заполненности полей title, description и date. В случае успеха, запускает обновление задачи
   * @memberof Right_Bar_component
   */
  const saveTaskChanges = (): void => {
    if (title && description && date) {
      updateOrDeleteTaskHandler(
        {
          id: id,
          title,
          description,
          date: `${date}`,
          completed: selectedTask.completed,
          files,
        },
        id
      );
    } else {
      setError("Все поля должны быть заполнены");
    }
  };
  /**
   * функция выполняет запускает удаление задачи и вложенных файлов
   * @memberof Right_Bar_component
   */
  const deleteTask = (): void => {
    updateOrDeleteTaskHandler(null, id);
    deleteAllFile(files, id);
    closeRightBar();
  };

  return (
    <div className="right_bar">
      <div onClick={closeRightBar} className="close_button">
        +
      </div>
      <div className="input_field">
        <label htmlFor="title">Title</label>
        <input
          maxLength={60}
          type="text"
          value={title}
          onChange={changeTitleHandler}
          id="title"
          placeholder="Title"
        />
      </div>
      <div className="input_field">
        <label htmlFor="description">Description</label>
        <textarea
          maxLength={120}
          onChange={changeDescriptionHandler}
          value={description}
          rows={4}
          id="description"
          placeholder="Description"
        />
      </div>
      <div className="input_field">
        <label htmlFor="date">Date</label>

        <ReactDatePicker
          placeholderText="Date"
          id="date"
          onChangeRaw={() => setError("")}
          selected={new Date(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={(date: Date) => setDate(`${date}`)}
        />
      </div>

      <AddFileComponent
        taskId={selectedTask.id}
        files={files}
        pending={pending}
        setError={setError}
        setPending={setPending}
        setFiles={setFiles}
      />
      <div className="save_button" onClick={saveTaskChanges}>
        Сохранить изменения
      </div>
      <div className="delete_button" onClick={deleteTask}>
        Удалить задачу
      </div>
    </div>
  );
};

export default RightBar;
