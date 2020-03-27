import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Back from "./components/Back";
import TodoPage from "./components/TodoPage";
import LoadingComponent from "./components/Loading";
import Timer from "./components/timer";

class App extends Component {
  state = {
    activeTask: null,
    time: 0,
    isOn: false,
    start: 0
  };

  setActive = active => {
    this.setState({ activeTask: active });
  };

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });

    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    );
  };

  stopTimer = () => {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({ time: 0, isOn: false });
  };

  render() {
    const { activeTask, isOn, time } = this.state;

    return (
      <div>
        <LoadingComponent>
          <Router>
            <div className="Back">
              <Route exact path="/" component={Back} />
            </div>
            <div>
              <Route path="/login" component={Login} />
              <Route path="/signUp" component={Signup} />
              <Route
                path="/TodoPage"
                render={() => <TodoPage setActive={this.setActive} />}
              />
              <Route
                path="/timer"
                render={() => (
                  <Timer
                    activeTask={activeTask}
                    time={time}
                    isOn={isOn}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    resetTimer={this.resetTimer}
                  />
                )}
              />
            </div>
          </Router>
        </LoadingComponent>
      </div>
    );
  }
}

export default App;
