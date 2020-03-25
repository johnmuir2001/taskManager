import React, { Component } from "react";
import '../css/taskinput.css'

class TaskInput extends Component {
  state = {
    list: [],
    currentInput: "",
    doneList: [],
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
    this.setState({ list: storeInput, currentInput: "" });
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

  taskDelete = (index) => {
    let storeList = [...this.state.list]
    storeList.splice(index, 1)
    this.setState({list: storeList})
  }

  doneDelete = (index) => {
    let doneTask = [...this.state.doneList]
    doneTask.splice(index, 1)
    this.setState({doneList: doneTask})
  }

  doneTasks = (index) => {
    let storeDone = [...this.state.doneList]
    //so we need to push the task we want from the first array
    //first we need to get it. 
    let currentTasks = [...this.state.list]
    let task = currentTasks.splice(index, 1)
    //then we need to push it
    storeDone.push(task)
    
    //save and run this to see if it works
    this.setState({doneList: storeDone, list: currentTasks})

  }

render () {
  return (
    <div>
      {this.props.todo ? null : 
        <div className="inputwrapper">
          <input placeholder="Enter Task Here" type="text" value={this.state.currentInput} onChange={this.addHandler} onKeyPress={this.enterHandler}></input>
          <button className="plus" onClick={this.submit}>+</button>
        </div>}
        <div className="inputcontainer">
      {this.props.todo ? 
      this.state.doneList.map((savedInput, index) => {
        return (
            <div key={index}>
              <p>{savedInput.task}</p>
              <button onClick={() => this.doneDelete(index)} >Delete</button>
             </div>
              )
      }) : 
      this.state.list.map((savedInput, index) => {
        return (
          <div className="taskwrapper" key={index}>
            <p>{savedInput.task}</p>
            <div className="buttonwrapper">
            <button className="button start">  Start</button>
            <button className="button done " onClick={() => this.doneTasks(index)} >Done</button>
            <button className="button delete" onClick={() => this.taskDelete(index)} >X</button>
          </div>
          </div>
              )
      })}
      </div>
    </div>
  )
}
}

export default TaskInput;
