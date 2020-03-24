import React, { Component } from "react";
import "../css/signup.css";
import { Link } from "react-router-dom";
import logo from "../images/GGWgoGetWork.png";
import PasswordMask from "react-password-mask";

class Signup extends Component {
  state = {
    list: [],

    signUpName: "",
    signUpEmail: "",
    signUpPassword: ""
  };

  handleSignUp = async () => {
    const signup = await fetch("http://localhost:3010/users", {
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
        <img className="logo" src={logo} alt="logo" />
        <h1>Sign Up</h1>
        <div className="SignUp">
          <input type="text" name="signUpName" value={this.state.signUpName} onChange={this.handleChange} placeholder="Name"></input>
          <input type="text" name="signUpEmail" value={this.state.signUpEmail} onChange={this.handleChange} placeholder="Email"></input>
          <PasswordMask
            buttonClassName="signUpPassword"
            type="password"
            name="signUpPassword"
            value={this.state.signUpPassword}
            onChange={this.handleChange.bind(this)} useVendorStyles={false} placeholder="Password"
          ></PasswordMask> 
          <Link to="/TodoPage">
            <button className="continue"onClick={this.handleSignUp}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
