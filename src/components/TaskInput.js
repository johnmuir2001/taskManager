import React, { Component } from "react";
// import AwesomeComponent from "./Loading.js"

class TaskInput extends Component {
  state = {
    list: [],
    currentInput: ""
  };

  componentDidMount = async () => {
    const response = await fetch("http://localhost:3010/tasks", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json"
    },
})
  const data = await response.json()
  this.setState({list: data})
  console.log(data)
  console.log(this.state.list)
  }

  addHandler = e => {
    this.setState({ currentInput: e.target.value });
  };

  submit = () => {
    let storeInput = this.state.list;

    if (this.state.currentInput === "") {
      return alert("Please Enter a Task");
    }
    storeInput.push({task: this.state.currentInput});
    this.setState({ input: storeInput, currentInput: "" });
    console.log("task has been added");

    fetch("http://localhost:3010/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
        task: this.state.currentInput
      })
    })
  };

  enterHandler = event => {
    if (event.key === "Enter") {
      this.submit();
    }
  };

  render() {
    return (
        <div>
          <input
            placeholder="Enter Task Here"
            type="text"
            value={this.state.currentInput}
            onChange={this.addHandler}
            onKeyPress={this.enterHandler}
            ></input>
          <button onClick={this.submit}>+</button>
          {this.state.list.map((savedInput, index) => {
            return <p key={index}>{savedInput.task}</p>;
          })}
        </div>
    );
  }
}

export default TaskInput;
