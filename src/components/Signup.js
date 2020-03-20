import React, { Component } from "react";
import "../css/signup.css";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    list: [],

    signUpName: "",
    signUpEmail: "",
    signUpPassword: ""
  };

  handleSignUp = async () => {
    const signup = await fetch("http://localhost:3005/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword
      })
    });
    const newUser = await signup.json();
    localStorage.setItem("token", newUser.token);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="background">
        <h1>Sign Up</h1>
        <div className="SignUp">
          <label>Name:</label>
          <input type="text" name="signUpName" value={this.state.signUpName} onChange={this.handleChange}></input>
          <label>Email:</label>
          <input type="text" name="signUpEmail" value={this.state.signUpEmail} onChange={this.handleChange}></input>
          <label>Password:</label>
          <input
            type="text"
            name="signUpPassword"
            value={this.state.signUpPassword}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.handleSignUp}>
            <Link to="/TodoPage">Sign Up</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
