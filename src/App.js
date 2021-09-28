import './App.css';

import {v4 as uuidv4} from "uuid";
import React, { useState, useEffect, useRef} from 'react';


function App() {

  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState("");
  const[tasks, setTasks] = useState([]);

  // funtion to add tasks to the list.
  const addTask = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    setTasks([...tasks, {text: inputValue, id: uuidv4(),}, ]);
    setInputValue("");
  };

  const removeTask = (id) =>{
    setTasks(tasks.filter(task => task.id !== id));
  }

  useEffect(() => {

    if(firstRender.current){
      console.log('true');
      firstRender.current = false; 
    }
    else{
      localStorage.setItem("Task", JSON.stringify([...tasks]));
      console.log("not first page load");
    }
  }, [tasks]);

  useEffect(() => {
      if(localStorage.getItem("Task") !== null) {
        const newTasks = localStorage.getItem("Task");
        setTasks(JSON.parse([...tasks, newTasks]));
      }

  }, []); 


  return (

    <div className="App">
      

      <div className="container">

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a task..."
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {tasks.map((task) => (
          <div key={task.id} className="task">
            <p>{task.text}</p>
            <i onClick={() => removeTask(task.id)} className="far fa-trash-alt"></i>
          </div>
         ))}

      </div>
    </div>
  );
};

export default App;
