import React, { Component } from "react";
import "../css/login.css";
import { Link, withRouter } from "react-router-dom";
import logo from "../images/GGWgoGetWork.png";
import PasswordMask from "react-password-mask";

class Login extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    message: " "
  };

  handleLogin = async () => {
    const login = await fetch("http://localhost:3010/users/login", {
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

    if(loginInfo.loggedIn === false){
      this.setState({ message: "Incorrect email or password"})
    } else if (loginInfo.loggedIn === true){
      this.props.history.push("/TodoPage")
    }

    this.setState({
      loginEmail: "",
      loginPassword: ""
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="loginWrap">
        <img className="logo" src={logo} alt="logo" />
        <h1>Welcome</h1>
        <div className="logIn">
          <input type="text" name="loginEmail" value={this.state.loginEmail} onChange={this.handleChange} useVendorStyles={false} placeholder="Email"></input>
          <PasswordMask buttonClassName="logInPassword" type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.handleChange} useVendorStyles={false} placeholder="Password"></PasswordMask>
          <h3 className="logInWarning">{this.state.message}</h3>
          <button className="continue" onClick={this.handleLogin}>
            Log In
          </button>
          <button className="signup">
            <Link to="/signUp">Sign Up Here...</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
