import MainNav from "../components/MainNav";
import "../css/timer.css";
import ms from "pretty-ms";
import React from "react";


class Timer extends React.Component {
  state = {}

  componentDidMount() {
    if (this.props.location) {
      this.setState({ ...this.props.location.state })
    } else if (this.props.activeTask) {
      this.setState({ ...this.props.activeTask })
    }
  }

  render() {
    const { currentTask } = this.state
    const { startTimer, stopTimer, resetTimer, time, isOn} = this.props

    return (
      <div className="container">
        <div className="circlebutton">
          <div className="task">
            <h1>Task: {currentTask && currentTask.task}</h1>
          </div>
          <div className="times">
            <h3>
              timer:{" "}
              {ms(time, {
                colonNotation: true,
                secondsDecimalDigits: 0
              })}
            </h3>
          </div>
          {currentTask && (
            <div>
              {time === 0 ? (
                <button className="button" onClick={startTimer}>
                  start
                </button>
              ) : null}
              {time === 0 || isOn ? null : (
                <button className="button" onClick={startTimer}>
                  resume
                </button>
              )}
              {time === 0 || !isOn ? null : (
                <button className="button" onClick={stopTimer}>
                  stop
                </button>
              )}
              {time === 0 || isOn ? null : (
                <button className="button" onClick={resetTimer}>
                  reset
                </button>
              )}
            </div>
          )}
        </div>
        <div className="nav">
          <MainNav />
        </div>
      </div>
    );
  }
}
export default Timer;
