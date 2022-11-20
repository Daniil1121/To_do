import React, { useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4hI8uXFQagwjxH_kPTgPsVXGTsUL6hps",
  authDomain: "test-task-6595b.firebaseapp.com",
  databaseURL:
    "https://test-task-6595b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-task-6595b",
  storageBucket: "test-task-6595b.appspot.com",
  messagingSenderId: "827945779575",
  appId: "1:827945779575:web:157d27a680101f268a2172",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

initializeApp(firebaseConfig);
// const taskArray = [
//   {
//     id: "1",
//     title: "готово",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     completed: true,
//     date: "Sat Nov 20 2022 15:45:32 GMT+0300",
//   },
//   {
//     id: "2",
//     title: "Title",
//     description: "string",
//     completed: false,
//     date: "Sat Nov 23 2022 15:45:32 GMT+0300",
//   },
//   {
//     id: "3",
//     title: "просрочено",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, temporibus?",
//     completed: false,
//     date: "Sat Nov 19 2022 15:45:32 GMT+0300",
//   },
//   {
//     id: "5",
//     title: "просрочено",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, temporibus?",
//     completed: false,
//     date: "Sat Nov 10 2022 15:45:32 GMT+0300",
//   },
//   {
//     id: "6",
//     title: "готово",
//     description:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, temporibus?",
//     completed: true,
//     date: "Sat Nov 10 2022 15:45:32 GMT+0300",
//   },
//   {
//     id: "4",
//     title: "готово",
//     description: "Lorem ipsum dolor sit amet.",
//     completed: true,
//     date: "Sat Nov 19 2022 15:45:33 GMT+0300",
//   },
// ];
function App() {
  // set(ref(getDatabase(), "task"), taskArray);
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;

// Object.values()
