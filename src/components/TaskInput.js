import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TaskInput extends Component {
  state = {
    list: [],
    currentInput: "",
    doneList: [],
    taskTimer: [],
  };

  componentDidMount = async () => {
    const response = await fetch(
      "https://whispering-temple-37575.herokuapp.com/tasks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json"
        }
      }
    );
    const data = await response.json();
    this.setState({ list: data });
  };

  addHandler = e => {
    this.setState({ currentInput: e.target.value });
  };

  //add new task
  submit = async () => {
    let storeInput = this.state.list;

    if (this.state.currentInput === "") {
      return alert("Please Enter a Task");
    }
    storeInput.push({ task: this.state.currentInput });
    this.setState({ list: storeInput, currentInput: "" });
    console.log("task has been added");

    fetch("https://whispering-temple-37575.herokuapp.com/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        task: this.state.currentInput
      })
    });
  };

  enterHandler = event => {
    if (event.key === "Enter") {
      this.submit();
    }
  };

  taskDelete = index => {
    let storeList = [...this.state.list];
    storeList.splice(index, 1);
    this.setState({ list: storeList });
  };

  doneDelete = index => {
    let doneTask = [...this.state.doneList];
    doneTask.splice(index, 1);
    this.setState({ doneList: doneTask });
  };

  doneTasks = index => {
    let storeDone = [...this.state.doneList];
    let currentTasks = [...this.state.list];
    let task = currentTasks.splice(index, 1);
    storeDone.push(task);
    this.setState({ doneList: storeDone, list: currentTasks });
  };

  

  render() {
    const { taskTimer, list, doneList, currentInput } = this.state;
    const { todo, setActive } = this.props;

    return (
      <div>
        {todo ? null : (
          <div>
            <input
              placeholder="Enter Task Here"
              type="text"
              value={currentInput}
              onChange={this.addHandler}
              onKeyPress={this.enterHandler}
            ></input>
            <button onClick={this.submit}>+</button>
          </div>
        )}
        {todo
          ? doneList.map((savedInput, index) => {
              return (
                <div key={index}>
                  <p>{savedInput.task}</p>
                  <button onClick={() => this.doneDelete(index)}>Delete</button>
                </div>
              );
            })
          : list.map((savedInput, index) => {
              return (
                <TodoItem
                  currentTask={savedInput}
                  index={index}
                  taskTimer={taskTimer}
                  doneTasks={this.doneTasks}
                  taskDelete={this.taskDelete}
                  setActive={setActive}
                />
              );
            })}
      </div>
    );
  }
}

export default TaskInput;
