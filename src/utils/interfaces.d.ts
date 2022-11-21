import { DatabaseReference } from "firebase/database";

/**
 * @interface IAddFileComponent
 * @property {string} taskId - id задачи, в которую добавляют файлы
 * @property {IFileData[]} files - массив задач
 * @property {boolean}  pending - boolean для переключения флага "загрузка"
 * @property {Dispatch<SetStateAction<string>>}  setError - функция Dispatch из useState
 * @property {Dispatch<SetStateAction<boolean>>}   setPending - функция Dispatch из useState
 * @property {Dispatch<SetStateAction<IFileData[]>>}  setFiles - функция Dispatch из useState
 */

export interface IAddFileComponent {
  taskId: string;
  files: IFileData[];
  pending: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<IFileData[]>>;
}

/**
 * @interface IPopUpProps
 * @property {function} popUpToogleHandler - функция, которая включает и выключает отображение PopUp
 * @property {function} AddNewTaskHandler - функция, создающая новую задачу и добавляющая её на клиенте
 */

interface AddNewTaskHandler {
  (task: ITask, newPostRef: DatabaseReference): void;
}

export interface IPopUpProps {
  popUpToogleHandler: () => void;
  AddNewTaskHandler: (task: ITask, newPostRef: DatabaseReference) => void;
}

/**
 * @interface ITask
 * @property {string} id - id задачи
 * @property {string} title - заголовок задачи
 * @property {string} description - описание задачи
 * @property {string} date - дата выполнения задачи
 * @property {boolean} completed - флаг выполнения задачи
 * @property {IFileData[]} files - массив прикрепленных файлов задачи
 */

export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  files?: IFileData[];
}
/**
 * @interface IFileData
 * @property {string} url - ссылка на файл
 * @property {string} type - тип файла
 * @property {string} name - имя файла
 */
export interface IFileData {
  url: string;
  type: string;
  name: string;
}

export type ICompletedTasksProps = {
  updateOrDeleteTaskHandler: (task: ITask | null, id: string) => void;
} & {
  setSelectedTask: (task: ITask) => void;
} & { completedTasksArray: ITask[] };

export type IOverdueTasksProps = { OverdueTasksArray: ITask[] } & {
  setSelectedTask: (task: ITask) => void;
};

export type IPopUpProps = {
  popUpToogleHandler: () => void;
  AddNewTaskHandler: (task: ITask, newPostRef: DatabaseReference) => void;
};

export type IRightBarProps = {
  setSelectedTask: (_: null) => void;
  selectedTask: ITask;
  updateOrDeleteTaskHandler: (task: ITask | null, id: string) => void;
};

export type ITaskProps = {
  setSelectedTask: (task: ITask) => void;
} & ITask & { overdue?: boolean } & {
    updateOrDeleteTaskHandler: (task: ITask | null, id: string) => void;
  };
