import React, { Component } from "react";
import "../css/signup.css";
import { withRouter } from "react-router-dom";
import logo from "../images/animation2.gif";
import PasswordMask from "react-password-mask";
import { withLoading } from "./Loading";

class Signup extends Component {
  state = {
    message: " ",
    signUpName: "",
    signUpEmail: "",
    signUpPassword: ""
  };

  handleSignUp = async () => {
    if (
      this.state.signUpName === "" ||
      this.state.signUpEmail === "" ||
      this.state.signUpPassword === ""
    ) {
      this.setState({ message: "Please enter details" });
      return;
    }
    const signup = await fetch(
      "https://whispering-temple-37575.herokuapp.com/users",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: this.state.signUpName,
          email: this.state.signUpEmail,
          password: this.state.signUpPassword
        })
      }
    );
    const newUser = await signup.json();
    localStorage.setItem("token", newUser.token);

    this.props.history.push("/TodoPage");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="background">
          <img className="logo" src={logo} alt="logo" />
          <h1>Sign Up</h1>
          <div className="SignUp">
            <input
              type="text"
              name="signUpName"
              value={this.state.signUpName}
              onChange={this.handleChange}
              placeholder="Name"
            ></input>
            <input
              type="text"
              name="signUpEmail"
              value={this.state.signUpEmail}
              onChange={this.handleChange}
              placeholder="Email"
            ></input>
            <PasswordMask
              buttonClassName="signUpPassword"
              type="password"
              name="signUpPassword"
              value={this.state.signUpPassword}
              onChange={this.handleChange.bind(this)}
              useVendorStyles={false}
              placeholder="Password"
            ></PasswordMask>
            <h3 className="signUpWarning">{this.state.message}</h3>
            <button className="continue" onClick={this.handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withLoading(Signup));
