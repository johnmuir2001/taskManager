import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ index, currentTask, sendTime, doneTasks, taskDelete }) => (
  <div className="taskwrapper" key={index}>
    <p className="taskName">{currentTask.task}</p>
      <div className="buttonwrapper">
        <Link to={{ pathname: "/timer", state: { currentTask } }}>
          <button className="taskbutton start" onClick={() => sendTime({currentTask})} >Start</button>
        </Link>
        <button className="taskbutton done" onClick={() => doneTasks({currentTask}, index)} >Done</button>
        <button className="taskbutton delete" onClick={() => taskDelete(index)} >X</button>
      </div>
  </div>
);

export default TodoItem;