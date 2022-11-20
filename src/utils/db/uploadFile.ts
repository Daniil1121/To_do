import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IFileData } from "../interfaces";

const uploadFiles = (
  e: React.ChangeEvent<HTMLInputElement>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setPending: React.Dispatch<React.SetStateAction<boolean>>,
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>,
  taskId: string
) => {
  setError("");
  const storage = getStorage();
  const storageRef = ref(
    storage,
    "images/" + taskId + "/" + e.target.files![0].name
  );
  setPending(true);
  uploadBytesResumable(storageRef, e.target.files![0])
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setFiles((prev) => [
          {
            url: downloadURL,
            name: e.target.files![0].name,
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
