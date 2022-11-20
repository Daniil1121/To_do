import { deleteObject, getStorage, ref } from "firebase/storage";
import { IFileData } from "../interfaces";

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
