import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/mainnav.css";
import home from "../images/home.png";
import logOut from "../images/sign-out.png";
import timer from "../images/timer.png";
import timesheet from "../images/timesheet.png";

class MainNav extends Component {
  logout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div className="containermainNav">
        <div className="navStart"></div>
        <div className="middle">
          <Link className="navItem toDo" to="/TodoPage">
            <span className="navText">To Do</span>
            <span className="navIcon"><img className="navIconImg" src={home} alt="todo icon"></img></span>
          </Link>
          <Link className="navItem timer" to="/timer">
            <span className="navText">Timer</span>
            <span className="navIcon"><img className="navIconImg" src={timer} alt="timer icon"></img></span>
          </Link>
          <Link className="navItem timesheet" to="timesheet">
            <span className="navText">Timesheet</span>
            <span className="navIcon"><img className="navIconImg" src={timesheet} alt="timesheet icon"></img></span>
          </Link>
        </div>
        <div className="end">
          <Link className="navItem logOut" onClick={this.logout} to="/">
            <span className="navText">Log Out</span>
            <span className="navIcon"><img className="navIconImg" src={logOut} alt="log out icon"></img></span>
          </Link>
        </div>
      </div>
    );
  }
}

export default MainNav;
