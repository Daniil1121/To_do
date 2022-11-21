import React, { useRef } from "react";
import uploadFiles from "./../utils/db/uploadFile";
import deleteFile from "./../utils/db/deleteFile";
import { IAddFileComponent, IFileData } from "../utils/interfaces";

/**
 * @namespace Add_File_Component
 */

/**
 * Компонент, используемый для загрузки файлов
 * @memberof Add_File_Component
 * @type {React.FC}
 * @returns {React.ReactElement} Компоненту, используемую для добавления файлов
 * @param {IAddFileComponent} props - Входные данные компоненты
 */

const AddFileComponent = ({
  taskId,
  files,
  pending,
  setError,
  setPending,
  setFiles,
}: IAddFileComponent): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  /**
   * функция onclick, передающая клик на input[type='file']
   * @memberof Add_File_Component
   */
  const inputClickHandler = () => {
    inputRef.current?.click();
  };
  /**
   * функция слушатель, сравнивает имена файлов из массива и нового файла, в случае совпадения, меняет флаг duplicateNameMarker на true, запускает функцию uploadFiles
   * @memberof Add_File_Component
   * @param {React.ChangeEvent<HTMLInputElement>} event - событие клика
   */
  const uploadFilesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let duplicateNameMarker = false;
    if (files.some((item) => item.name === e.target.files![0].name)) {
      duplicateNameMarker = true;
    }
    uploadFiles(e, setError, setPending, setFiles, taskId, duplicateNameMarker);
  };
  /**
   * блок, в котором хранится разметка для файлов типа image
   * @memberof Add_File_Component
   */
  const IMAGES_BLOCK = files
    .filter((item) => item.type.includes("image"))
    .map((item) => (
      <div key={item.url} className="upload_file_preview">
        <div
          onClick={(e) =>
            deleteFile(
              e,
              item.name,
              item.url,
              taskId,
              setError,
              setPending,
              setFiles
            )
          }
          className="close_button"
        >
          +
        </div>
        <img src={item.url} alt="" />
        <span>{item.name}</span>
      </div>
    ));
  /**
   * блок, в котором хранится разметка для файлов, кроме image
   * @memberof Add_File_Component
   */
  const OTHER_FILES_BLOCK = files
    .filter((item) => !item.type.includes("image"))
    .map((item) => (
      <div key={item.url} className="upload_file_preview">
        <div
          onClick={(e) =>
            deleteFile(
              e,
              item.name,
              item.url,
              taskId,
              setError,
              setPending,
              setFiles
            )
          }
          className="close_button"
        >
          +
        </div>
        <a
          href={item.url}
          className="upload_file_preview"
          download="newfilename"
          target="blank"
        >
          Нажмите, чтобы открыть в новом окне
        </a>
        <div className="name">{item.name}</div>
      </div>
    ));

  return (
    <>
      <input type="file" ref={inputRef} hidden onChange={uploadFilesHandler} />
      <button
        disabled={pending || files.length === 3}
        className="fake_inpit_button"
        onClick={inputClickHandler}
      >
        upload file
      </button>
      <div className="upload_files_container">
        {IMAGES_BLOCK}
        {OTHER_FILES_BLOCK}
      </div>
    </>
  );
};

export default AddFileComponent;
