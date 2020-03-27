import MainNav from "../components/MainNav";
import React, { Component } from "react";
const ms = require("pretty-ms");

class Timesheet extends Component {
  state = {
    Timesheet: [{ task: "", time: "" }],
    OrderTimesheet: [],
    gotTasks: false
  };

  componentDidMount() {
    this.showTasks();
  }

  showTasks = async e => {
    const tempHeader = new Headers();
    const headerToken = localStorage.token;
    tempHeader.append("Authorization", `${headerToken}`);
    await fetch("https://whispering-temple-37575.herokuapp.com/tasks", {
      headers: tempHeader,
      method: "GET"
    })
      .then(res => res.json())
      .then(data => this.setState({ Timesheet: data }));

    const order = [];
    let x;
    let y;
    for (x = 0; x < this.state.Timesheet.length; x++) {
      for (y = 0; y < this.state.Timesheet[x].runTime.length; y++) {
        let temp = this.state.Timesheet[x].runTime[y];
        temp["task"] = this.state.Timesheet[x].task;
        order.push(temp);
      }
    }
    order.sort((a, b) => (a.timeStarted < b.timeStarted ? 1 : -1));
    this.setState({ OrderTimesheet: order, gotTasks: true });
  };

  dateCheck = (e, index) => {
    let date = new Date(e);
    //let day = date.getDay();
    if (index !== this.state.OrderTimesheet.length - 1 && index !== 0) {
      if (
        new Date(this.state.OrderTimesheet[index].timeStarted).getDay() !==
        new Date(this.state.OrderTimesheet[index - 1].timeStarted).getDay()
      ) {
        return (
          <h2>
            {new Date(date).toUTCString()}{" "}
            {this.timeToday(
              this.state.OrderTimesheet,
              new Date(date).toUTCString()
            )}
          </h2>
        );
      }
    }
  };

  timeToday = (instanceList, date) => {
    let arrSum = "";
    const now = new Date(date);
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const dayCheck = startOfDay.getTime();
    const test = instanceList.filter(value => value.timeStarted > dayCheck);
    console.log(test);
    const array = test.map(value => value.timeRan);
    console.log(array);
    arrSum = array.reduce((a, b) => a + b, 0);
    console.log(arrSum);
    return arrSum;
  };

  timeWeek = instanceList => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const dayCheck = startOfDay.getTime();
    let day = now.getDay();
    if (day === 0) {
      day = 7;
    }
    const test = instanceList.filter(
      value => (value.timeStarted > dayCheck) - (day - 1) * 86400000
    );
    const array = test.map(value => value.timeRan);
    const arrSum = array.reduce((a, b) => a + b, 0);
    return arrSum;
  };

  render() {
    return (
      <div className="toDoList">
        {/* <button onClick={this.showTasks}>Show Tasks</button> */}
        <h3>
          This week's total time: {this.timeWeek(this.state.OrderTimesheet)}
        </h3>
        {this.state.gotTasks ? (
          <h2>
            {new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()}{" "}
            {this.timeToday(
              this.state.OrderTimesheet,
              new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()
            )}
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
            </div>
          );
        })}
        <MainNav />
      </div>
    );
  }
}

export default Timesheet;
