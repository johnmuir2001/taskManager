import React, { Component } from "react";
const ms = require("pretty-ms");

class Timesheet extends Component {
  state = {
    Timesheet: [{ task: "", time: "" }],
    OrderTimesheet: [],
    getTasks: false
  };

  login = e => {
    e.preventDefault();
    let databody = {
      email: "test@this.com",
      password: "thispotato"
    };
    fetch("https://whispering-temple-37575.herokuapp.com/users/login", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
      });
  };

  showTasks = async e => {
    const tempHeader = new Headers();
    const headerToken = localStorage.token;
    tempHeader.append("Authorization", `${headerToken}`);
    e.preventDefault();
    await fetch("https://whispering-temple-37575.herokuapp.com/tasks", {
      headers: tempHeader,
      method: "GET"
    })
      .then(res => res.json())
      .then(data => this.setState({ Timesheet: data }));

    console.log(this.state.Timesheet);
    const order = [];
    let x;
    let y;
    for (x = 0; x < this.state.Timesheet.length; x++) {
      for (y = 0; y < this.state.Timesheet[x].runTime.length; y++) {
        let temp = this.state.Timesheet[x].runTime[y];
        temp["task"] = this.state.Timesheet[x].task;
        console.log(temp);
        order.push(temp);
      }
    }
    order.sort((a, b) => (a.timeStarted < b.timeStarted ? 1 : -1));
    this.setState({ OrderTimesheet: order, gotTasks: true });
    console.log(this.state.OrderTimesheet);
  };

  dateCheck = (e, index) => {
    let date = new Date(e);
    let day = date.getDay();
    console.log(e);
    console.log(day);
    if (index !== this.state.OrderTimesheet.length - 1 && index !== 0) {
      if (
        new Date(this.state.OrderTimesheet[index].timeStarted).getDay() !==
        new Date(this.state.OrderTimesheet[index - 1].timeStarted).getDay()
      ) {
        console.log("Yes");
        return <h2>{new Date(date).toUTCString()}</h2>;
      }
    }
  };

  render() {
    return (
      <div className="toDoList">
        <button onClick={this.login}>Login</button>
        <button onClick={this.showTasks}>Show Tasks</button>
        <button
          onClick={() => {
            console.log(this.state.Timesheet);
          }}
        >
          Log
        </button>
        {this.state.gotTasks ? (
          <h2>
            {new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()}
          </h2>
        ) : null}
        {this.state.OrderTimesheet.map((num, index) => {
          return (
            <div key={index} className="Task">
              {this.dateCheck(num.timeStarted, index)}
              <h4 className="listContent">{num.task}</h4>
              <p className="listContent">
                {new Date(num.timeStarted).toUTCString()}
              </p>
              <p className="listContent">
                {ms(num.timeRan, {
                  verbose: true,
                  secondsDecimalDigits: 0
                })}
              </p>
              {/* <button className="delete" onClick={() => this.delete(index)}>
                x
              </button> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Timesheet;
