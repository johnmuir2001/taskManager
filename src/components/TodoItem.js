import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ index, currentTask, setActive }) => (
  <div key={index}>
    <p>{currentTask.task}</p>
    <Link to={{ pathname: "/timer", state: { currentTask } }}>
      <button onClick={()=>setActive({currentTask})}>Start</button>
    </Link>
    <button onClick={() => this.doneTasks(index)}>Done</button>
    <button onClick={() => this.taskDelete(index)}>Delete</button>
  </div>
);

export default TodoItem;
