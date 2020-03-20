import React from "react";
import { Link } from "./node_modules/react-router-dom";
import '../css/nav.css';

const Nav = () => {
  return (
    <div className="navbar">
        <div className="containReturn">
      <div className="home">
        <Link to="/"> Restart </Link>
      </div>
      </div>
      <div className="buttons">
      <button className="projects">
        <Link to="/Projects"> Sign In </Link>
      </button>
      <button className="contact">
        <Link to="/Contact"> Sign Up</Link>
      </button>
      </div>
    </div>
  );
};

export default Nav;