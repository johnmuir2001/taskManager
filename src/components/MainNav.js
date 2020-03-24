import React from "react";
import { Link } from "react-router-dom";
import "../css/mainnav.css";

const MainNav = () => {
  return (
    <div className="containermainNav">
      <div className="mainNav">
       <Link to="/TodoPage">To Do</Link>
       <Link to="timer">Timer</Link>
       <Link to="timesheet">Timesheet</Link>
        </div>
    </div>
  );
};

export default MainNav;
