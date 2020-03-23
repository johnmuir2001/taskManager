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
      <div>
        <h3>
          timer:{" "}
          {ms(this.state.time, {
            colonNotation: true,
            secondsDecimalDigits: 0
          })}
        </h3>
        {this.state.time === 0 ? (
          <button onClick={this.startTimer}>start</button>
        ) : null}
        {this.state.time === 0 || this.state.isOn ? null : (
          <button onClick={this.startTimer}>resume</button>
        )}
        {this.state.time === 0 || !this.state.isOn ? null : (
          <button onClick={this.stopTimer}>stop</button>
        )}
        {this.state.time === 0 || this.state.isOn ? null : (
          <button onClick={this.resetTimer}>reset</button>
        )}
      </div>
    );
  }
}
module.exports = Timer;
