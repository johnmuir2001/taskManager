import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ index, currentTask, setActive, doneTasks, taskDelete }) => (
  <div className="taskwrapper" key={index}>
    <p className="taskName">{currentTask.task}</p>
      <div className="buttonwrapper">
        <Link to={{ pathname: "/timer", state: { currentTask } }}>
          <button className="taskbutton start" onClick={() => setActive({currentTask})}>Start</button>
        </Link>
        <button className="taskbutton done" onClick={() => doneTasks(index)} >Done</button>
        <button className="taskbutton delete" onClick={() => taskDelete(index)} >X</button>
      </div>
  </div>
);



export default TodoItem;
