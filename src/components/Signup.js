import React, { Component } from "./node_modules/react";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    //testing submit function
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    console.log(user);
  };

  render() {
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="text" value={this.state.email} onChange={this.handleEmail}></input>
          <label>Username</label>
          <input type="text" value={this.state.username} onChange={this.handleUsername}></input>
          <label>Password</label>
          <input type="password" value={this.state.password} onChange={this.handlePassword}></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default Signup;
