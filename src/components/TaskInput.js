import React, { Component } from "react";
import "../css/taskinput.css";
import TodoItem from "./TodoItem";



class TaskInput extends Component {
  state = {
    list: [],
    currentInput: "",
    doneList: [],
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true})
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
    let doneArr = [];
    let arr = [];
    data.map(task => {
      if (task.status === true) {
        doneArr.push(task);
        return null;
      } else {
        arr.push(task);
        return null;
      }
    });
    this.setState({list: arr, doneList: doneArr, loading: false})
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

    console.log("task has been added");

    const response = await fetch(
      "https://whispering-temple-37575.herokuapp.com/tasks",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          task: this.state.currentInput
        })
      }
    );
    const data = await response.json();
    storeInput.push(data);
    this.setState({ list: storeInput, currentInput: "" });
  };

  enterHandler = event => {
    if (event.key === "Enter") {
      this.submit();
    }
  };
  //delete task in todo
  taskDelete = index => {
    let storeList = [...this.state.list];
    let remove = storeList.splice(index, 1);
    //sets state for new list
    this.setState({ list: storeList });
    //deletes task from database
    fetch(
      `https://whispering-temple-37575.herokuapp.com/tasks/${remove[0]._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
  };

  //delete task in done
  doneDelete = async index => {
    let doneTask = [...this.state.doneList];
    //the array containing an array containing an object
    let remove = doneTask.splice(index, 1);
    this.setState({ doneList: doneTask });
    //deletes task from database
    fetch(
      `https://whispering-temple-37575.herokuapp.com/tasks/${remove[0]._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
  };

  //move tasks to done
  doneTasks = async index => {
    let storeDone = [...this.state.doneList];
    //so we need to push the task we want from the first array
    //first we need to get it.
    let currentTasks = [...this.state.list];
    let task = currentTasks.splice(index, 1)[0];
    //then we need to push it
    storeDone.push(task);
    //save and run this to see if it works
    this.setState({ doneList: storeDone, list: currentTasks });
    await fetch(
      `https://whispering-temple-37575.herokuapp.com/tasks/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          status: true
        })
      }
    );
  };

  backButton = index => {
    let storeDone = [...this.state.doneList];
    let currentTasks = [...this.state.list];
    let task = storeDone.splice(index, 1)[0];
    currentTasks.push(task);
    this.setState({ doneList: storeDone, list: currentTasks });
  }

  render() {
    const { list, doneList, currentInput, loading } = this.state
    const { todo, setActive } = this.props

    return (
      <div>
        {todo ? null : (
          <div className="inputwrapper">
            <input
              placeholder="Enter Task Here"
              type="text"
              value={currentInput}
              onChange={this.addHandler}
              onKeyPress={this.enterHandler}
            ></input>
            <button className="plus" onClick={this.submit}>
              +
            </button>
          </div>
        )}
        <div className="inputcontainer">
          <h1 className={loading ? "loading" : "loading hidden"}>Loading Tasks...</h1>
          {todo
            ? doneList.map((savedInput, index) => {
                return (
                  <div className="donewrapper" key={index}>
                    <p className="taskName">{savedInput.task}</p>
                    <button onClick={() => this.backButton(index)}>Back</button>
                    <button
                      className="donedelete"
                      onClick={() => this.doneDelete(index)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            : list.map((savedInput, index) => (
                <TodoItem
                  currentTask={savedInput}
                  index={index}
                  doneTasks={this.doneTasks}
                  taskDelete={this.taskDelete}
                  setActive={setActive}
                />
              ))}
        </div>
        <div className="fade"></div>
      </div>
    );
  }
}

export default TaskInput;
