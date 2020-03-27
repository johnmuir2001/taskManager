import MainNav from "../components/MainNav";
import React, { Component } from "react";
import { withLoading } from "./Loading";

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
    let today = new Date();
    let date = new Date(e);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    if (index === 0) {
      if (
        `${days[date.getDay()]}, ${date.getDate()} ${
          months[date.getMonth()]
        }` ===
        `${days[today.getDay()]}, ${today.getDate()} ${
          months[today.getMonth()]
        }`
      ) {
        return (
          <div>
            <h2>{"Today"}</h2>
            <h2>
              {this.timeToday(
                this.state.OrderTimesheet,
                new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()
              )}
            </h2>
          </div>
        );
      } else if (
        `${days[date.getDay()]}, ${date.getDate()} ${
          months[date.getMonth()]
        }` ===
        `${days[today.getDay()]}, ${today.getDate() - 1} ${
          months[today.getMonth()]
        }`
      ) {
        return (
          <div>
            <h2>{"Yesterday"}</h2>
            <h2>
              {this.timeToday(
                this.state.OrderTimesheet,
                new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()
              )}
            </h2>
          </div>
        );
      } else {
        return (
          <div>
            <h2>
              {`${days[date.getDay()]}, ${date.getDate()} ${
                months[date.getMonth()]
              }`}
            </h2>
            <h2>
              {this.timeToday(
                this.state.OrderTimesheet,
                new Date(this.state.OrderTimesheet[0].timeStarted).toUTCString()
              )}
            </h2>
          </div>
        );
      }
    }
    if (
      index < this.state.OrderTimesheet.length &&
      index !== 0 &&
      new Date(this.state.OrderTimesheet[index].timeStarted).getDay() !==
        new Date(this.state.OrderTimesheet[index - 1].timeStarted).getDay()
    ) {
      return (
        <div>
          <h2>
            {`${days[date.getDay()]}, ${date.getDate()} ${
              months[date.getMonth()]
            }`}
          </h2>
          <h2>
            {this.timeToday(
              this.state.OrderTimesheet,
              new Date(date).toUTCString()
            )}
          </h2>
        </div>
      );
    }
  };

  timeToday = (instanceList, date) => {
    const now = new Date(date);
    const endDay = now.getTime() + 86400000;
    const endDayTime = new Date(endDay);
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      endDayTime.getFullYear(),
      endDayTime.getMonth(),
      endDayTime.getDate()
    );

    const dayCheck = startOfDay.getTime();
    const endDayCheck = endOfDay.getTime();
    //console.log(dayCheck);
    const test = instanceList.filter(
      value => value.timeStarted > dayCheck && value.timeStarted < endDayCheck
    );
    //console.log(test);
    const array = test.map(value => value.timeRan);
    const arrSum = array.reduce((a, b) => a + b, 0);
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

  getTime = e => {
    let date = new Date(e);
    return (
      <p className="listContent">{`Task Created at: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</p>
    );
  };

  getTotalTime = () => {
    if (this.timeWeek(this.state.OrderTimesheet) > 1000) {
      return (
        <h3>
          This weeks total time:{" "}
          {ms(this.timeWeek(this.state.OrderTimesheet), {
            verbose: true,
            secondsDecimalDigits: 0
          })}
        </h3>
      );
    } else {
      return <h3>This weeks total time is: 0</h3>;
    }
  };

  render() {
    return (
      <div className="toDoList">
        {/* <button onClick={this.showTasks}>Show Tasks</button> */}
        {this.getTotalTime()}
        {this.state.OrderTimesheet.map((num, index) => {
          return (
            <div key={index} className="Task">
              {this.dateCheck(num.timeStarted, index)}
              <h4 className="listContent">{num.task}</h4>
              {this.getTime(num.timeStarted)}
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

export default withLoading(Timesheet);
