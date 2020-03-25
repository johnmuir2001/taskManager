import React from "react";
import { Link } from "react-router-dom";
import "../css/mainnav.css";
import logo from "../images/GGWgoGetWork.png";

const MainNav = () => {
  return (
    <div className="containermainNav">
      <div className="start">
          <img className="navLogo" src={logo} alt="logo"></img>
      </div>
      <div className="middle">
        <Link className="navItem toDo" to="/TodoPage">To Do</Link>
        <Link className="navItem timer" to="/timer">Timer</Link>
        <Link className="navItem timesheet" to="timesheet">Timesheet</Link>
      </div>
      <div className="end">
        <Link className="navItem logOut" to="/">Log Out</Link>
      </div>
    </div>
  );
};

export default MainNav;
