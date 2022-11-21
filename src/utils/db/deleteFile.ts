import { deleteObject, getStorage, ref } from "firebase/storage";
import { IFileData } from "../interfaces";

/**
 * Функция удаляет конкретный файл из задачи
 * @memberof Clien_Server_Function
 * @param {React.MouseEvent<HTMLElement>} e - массив файлов для удаления из базы данных
 * @param {string} name - url файла
 * @param {string} url - url файла
 * @param {string} taskId - id задачи, из которой удаляются файлы
 * @param {React.Dispatch<React.SetStateAction<string>>} setError - - функция Dispacth из useState для установки значения ошибки
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setPending - - функция Dispacth из useState для установки флага загрузки
 * @param {React.Dispatch<React.SetStateAction<IFileData[]>>} setFiles - - функция Dispacth из useState для обновления массива тасков на клиенте
 */

const deleteFile = (
  e: React.MouseEvent<HTMLElement>,
  name: string,
  url: string,
  taskId: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setPending: React.Dispatch<React.SetStateAction<boolean>>,
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>
) => {
  e.stopPropagation();
  setPending(true);
  const storage = getStorage();
  const desertRef = ref(storage, "images/" + taskId + "/" + name);

  deleteObject(desertRef)
    .then(() => {
      setFiles((prev) => prev.filter((item) => item.url !== url));
    })
    .catch((error) => setError("Произошла ошибка удаления"))
    .finally(() => setPending(false));
};

export default deleteFile;
