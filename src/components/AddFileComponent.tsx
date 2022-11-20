import React, { useRef } from "react";
import uploadFiles from "./../utils/db/uploadFile";
import deleteFile from "./../utils/db/deleteFile";
import { IFileData } from "../utils/interfaces";

interface IAddFileComponent {
  taskId: string;
  files: IFileData[];
  pending: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>;
}

const AddFileComponent = ({
  taskId,
  files,
  pending,
  setError,
  setPending,
  setFiles,
}: IAddFileComponent): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputClickHandler = () => {
    inputRef.current?.click();
  };

  const uploadFilesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(e, setError, setPending, setFiles, taskId);
  };

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
        {item.name}
      </div>
    ));

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
