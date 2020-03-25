import React from "react";
import { Link } from "react-router-dom";
import "../css/mainnav.css";
// import AwesomeComponent from "./Loading"

const MainNav = () => {
  return (
    <div>
    
    <div className="containermainNav">
      <div className="mainNav">
       <Link to="/TodoPage">To Do</Link>
       <Link to="timer">Timer</Link>
       <Link to="timesheet">Timesheet</Link>
        </div>
    </div>
    </div>
  );
};

export default MainNav;
