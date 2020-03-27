import MainNav from "../components/MainNav";
import "../css/timer.css";
import logo from "../images/GGWgoGetWork.png";
const React = require("react");
const ms = require("pretty-ms");

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  startTimer() {
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
  }
  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState({ time: 0, isOn: false });
  }
  render() {
    return (
      <div className="container">
        <div className="topBanner">
          <img className="timerlogo" src={logo} alt="logo" />
        </div>
        <div className="circlebutton">
          <div className="times">
            <h2>Timer</h2>
            <h3>
              {ms(this.state.time, {
                colonNotation: true,
                secondsDecimalDigits: 0
              })}
            </h3>
          </div>
          <div>
            {this.state.time === 0 ? (
              <button className="button" onClick={this.startTimer}>
                Start
              </button>
            ) : null}
            {this.state.time === 0 || this.state.isOn ? null : (
              <button className="button" onClick={this.startTimer}>
                Resume
              </button>
            )}
            {this.state.time === 0 || !this.state.isOn ? null : (
              <button className="button" onClick={this.stopTimer}>
                Stop
              </button>
            )}
            {this.state.time === 0 || this.state.isOn ? null : (
              <button className="button" onClick={this.resetTimer}>
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="nav">
          <MainNav />
        </div>
      </div>
    );
  }
}
export default Timer;
