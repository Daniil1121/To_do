import { deleteObject, getStorage, ref } from "firebase/storage";
import { IFileData } from "../interfaces";

/**
 * Функция удаляет все файлы, ранее загруженные для одной задачи
 * @memberof Clien_Server_Function
 * @param {IFileData[]} files - массив файлов для удаления из базы данных
 * @param {string} id - id задачи, из которой удаляются файлы
 */

const deleteAllFile = (files: IFileData[], id: string) => {
  files.forEach((item) =>
    setTimeout(() => {
      const storage = getStorage();
      const desertRef = ref(storage, "images/" + id + "/" + item.name);
      deleteObject(desertRef).catch((error) =>
        console.log("Произошла ошибка удаления")
      );
    }, 300)
  );
};

export default deleteAllFile;
