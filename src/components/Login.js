import React, { Component } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import logo from "../images/GGWgoGetWork.png";

class Login extends Component {
  state = {
    list: [],
    name: "",
    loginEmail: "",
    loginPassword: ""
  };

  handleLogin = async () => {
    const login = await fetch("http://localhost:3005/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
    });
    const loginInfo = await login.json();
    console.log(loginInfo);
    localStorage.setItem("token", loginInfo.token);

    const response = await fetch("http://localhost:3005/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginInfo.token}`,
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    const user = await fetch(`http://localhost:3005/users/${data[0].owner}`);
    const userData = await user.json();
    this.setState({ name: userData.name, list: data, loginEmail: "", loginPassword: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="background">
        <img src={logo} alt="logo" />
        <h1>Log In</h1>
        <div className="logIn">
          <label>Email:</label>
          <input type="text" name="loginEmail" value={this.state.loginEmail} onChange={this.handleChange}></input>
          <label>Password:</label>
          <input type="text" name="loginPassword" value={this.state.loginPassword} onChange={this.handleChange}></input>
          <button className={localStorage.getItem("token") ? "active" : "inactive"} onClick={this.handleLogin}>
            <Link to="/TodoPage">Log In</Link>
          </button>
          <button>
            <Link to="/signUp">Not Signed Up yet...</Link>
          </button>
        </div>
        <h1>{this.state.name}</h1>
        {this.state.list.map((task, index) => {
          return (
            <div className="task">
              <h2 key={index}>{task.task}</h2>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Login;
