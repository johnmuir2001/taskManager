import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/mainnav.css";
import logo from "../images/GGWgoGetWork.png";

class MainNav extends Component {
  logout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div className="containermainNav">
        <div className="start">
          <img className="navLogo" src={logo} alt="logo"></img>
        </div>
        <div className="middle">
          <Link className="navItem toDo" to="/TodoPage">
            To Do
          </Link>
          <Link className="navItem timer" to="/timer">
            Timer
          </Link>
          <Link className="navItem timesheet" to="timesheet">
            Timesheet
          </Link>
        </div>
        <div className="end">
          <Link className="navItem logOut" onClick={this.logout} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  }
}

export default MainNav;
