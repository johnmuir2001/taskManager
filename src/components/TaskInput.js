import React, { Component } from "react";


class TaskInput extends Component {
  state = {
    list: [],
    currentInput: "",
    doneList: []
  };

  componentDidMount = async () => {
    const response = await fetch("https://whispering-temple-37575.herokuapp.com/tasks", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json"
    },
})
  const data = await response.json()
  let doneArr = []
  let arr = []
  data.map((task) => {
    
    if(task.status === true){
      doneArr.push(task)
    } else {
      arr.push(task)
    }
  })
  this.setState({list: arr, doneList: doneArr})
  console.log(this.state.doneList)
  }

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

    const response = await fetch("https://whispering-temple-37575.herokuapp.com/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
        task: this.state.currentInput
      })
    })
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
  taskDelete = (index) => {
    let storeList = [...this.state.list]
    let remove = storeList.splice(index, 1)
    //sets state for new list
    this.setState({list: storeList})
    //deletes task from database
    fetch(`http://localhost:3010/tasks/${remove[0]._id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  //delete task in done
  doneDelete = async (index) => {
    let doneTask = [...this.state.doneList];
    //the array containing an array containing an object
    let remove = doneTask.splice(index, 1)
    this.setState({doneList: doneTask})
    //deletes task from database
    fetch(`http://localhost:3010/tasks/${remove[0][0]._id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  //move tasks to done
  doneTasks = async (index) => {
    let storeDone = [...this.state.doneList]
    //so we need to push the task we want from the first array
    //first we need to get it. 
    let currentTasks = [...this.state.list]
    let task = (currentTasks.splice(index, 1))[0]
    //then we need to push it
    storeDone.push(task)
    //save and run this to see if it works
    this.setState({doneList: storeDone, list: currentTasks})
    await fetch(`http://localhost:3010/tasks/${task._id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: true
        }),
    })
  }

render () {
  return (
    <div>
      {this.props.todo ? null : 
        <div>
          <input placeholder="Enter Task Here" type="text" value={this.state.currentInput} onChange={this.addHandler} onKeyPress={this.enterHandler}></input>
          <button onClick={this.submit}>+</button>
        </div>}
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
          <div key={index}>
            <p>{savedInput.task}</p>
            <button>Start</button>
            <button onClick={() => this.doneTasks(index)} >Done</button>
            <button onClick={() => this.taskDelete(index)} >Delete</button>
          </div>
        );
      })}
    </div>
  );
  }
}

export default TaskInput;
