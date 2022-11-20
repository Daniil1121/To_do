import { DatabaseReference } from "firebase/database";

export interface IAddFileComponent {
  taskId: string;
  files: IFileData[];
  pending: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>;
}

export interface IPopUpProps {
  popUpToogleHandler: () => void;
  AddNewTaskHandler: (task: ITask, newPostRef: DatabaseReference) => void;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  files?: IFileData[];
}

export interface IFileData {
  url: string;
  type: string;
  name: string;
}
