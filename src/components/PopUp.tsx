import React, { memo, useEffect } from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddFileComponent from "./AddFileComponent";
import { DatabaseReference } from "firebase/database";
import deleteAllFile from "./../utils/db/deleteAllFiles";
import getNewKey from "./../utils/db/getNewKey";
import { IFileData, ITask } from "../utils/interfaces";

interface IPopUpProps {
  popUpToogleHandler: () => void;
  AddNewTaskHandler: (task: ITask, newPostRef: DatabaseReference) => void;
}

const PopUp = ({
  popUpToogleHandler,
  AddNewTaskHandler,
}: IPopUpProps): React.ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [files, setFiles] = useState<IFileData[]>([]);
  const [error, setError] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<DatabaseReference>();

  useEffect(() => {
    getNewKey(setNewKey);
  }, []);

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    setTitle(e.target.value);
  };

  const closePopUpHandler = () => {
    deleteAllFile(files, newKey!.key!);
    popUpToogleHandler();
  };

  const changeDescriptionHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setError("");
    setdescription(e.target.value);
  };

  const createNewTask = (): void => {
    if (title && description && date) {
      if (date instanceof Date) {
        AddNewTaskHandler(
          {
            id: newKey!.key!,
            title,
            description,
            date: `${date}`,
            completed: false,
            files,
          },
          newKey!
        );
        popUpToogleHandler();
      } else {
        setError("Введите корректную дату");
      }
    } else {
      setError("Все поля должны быть заполнены");
    }
  };

  return (
    <div className="overlay">
      <div className="pop_up">
        <div onClick={closePopUpHandler} className="close_button">
          +
        </div>
        <div className="input_field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={changeTitleHandler}
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="input_field">
          <label htmlFor="description">Description</label>
          <input
            maxLength={120}
            onChange={changeDescriptionHandler}
            value={description}
            type="text"
            id="description"
            placeholder="Description"
          />
        </div>
        <div className="input_field">
          <label htmlFor="date">Date</label>

          <ReactDatePicker
            autoComplete="off"
            placeholderText="Date"
            id="date"
            onChangeRaw={() => setError("")}
            selected={date}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={(date: Date) => setDate(date)}
          />
        </div>
        {newKey && (
          <AddFileComponent
            taskId={newKey!.key!}
            files={files}
            pending={pending}
            setError={setError}
            setPending={setPending}
            setFiles={setFiles}
          />
        )}
        <button
          disabled={pending}
          className="create_task_button"
          onClick={createNewTask}
        >
          Создать задачу
        </button>
        <span className="error"> {error}</span>
      </div>
    </div>
  );
};

export default memo(PopUp);
