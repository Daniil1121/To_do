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

initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;

// Object.values()
