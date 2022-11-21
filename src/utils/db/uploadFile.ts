import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IFileData } from "../interfaces";

/**
 * Функция загрузки файлов на сервер и отображения их на клиенте
 * @memberof Clien_Server_Function
 * @param {React.ChangeEvent<HTMLInputElement>} e - событие клика мыши
 * @param {React.Dispatch<React.SetStateAction<string>>} setError - - функция Dispacth из useState для установки значения ошибки
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setPending - - функция Dispacth из useState для установки флага загрузки
 * @param {React.Dispatch<React.SetStateAction<IFileData[]>>} setFiles - - функция Dispacth из useState для обновления массива тасков на клиенте
 * @param {taskId} taskId - новая задача (может быть null, для удаления задачи)
 * @param {boolean} duplicateNameMarker - новая задача (может быть null, для удаления задачи)
 *
 */

const uploadFiles = (
  e: React.ChangeEvent<HTMLInputElement>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setPending: React.Dispatch<React.SetStateAction<boolean>>,
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>,
  taskId: string,
  duplicateNameMarker: boolean
) => {
  setError("");
  const random = (Math.random() + 1).toString(36).substring(7);
  const storage = getStorage();
  const storageRef = ref(
    storage,
    "images/" +
      taskId +
      "/" +
      (duplicateNameMarker ? random : "") +
      e.target.files![0].name
  );
  setPending(true);
  uploadBytesResumable(storageRef, e.target.files![0])
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setFiles((prev) => [
          {
            url: downloadURL,
            name: (duplicateNameMarker ? random : "") + e.target.files![0].name,
            type: e.target.files![0].type,
          },
          ...prev,
        ]);
      });
    })
    .catch(() => setError("Произошла ошибка загрузки"))
    .finally(() => setPending(false));
};

export default uploadFiles;
