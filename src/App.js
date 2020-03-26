import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Back from "./components/Back";
import TodoPage from "./components/TodoPage";
import Timesheet from "./components/Timesheet";
import AwesomeComponent from "./components/Loading";
import Timer from "./components/timer";

function App() {
  return (
    <div>
      <AwesomeComponent>
        <Router>
          <div className="Back">
            <Route exact path="/" component={Back} />
          </div>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={Signup} />
            <Route path="/TodoPage" component={TodoPage} />
            <Route path="/timesheet" component={Timesheet} />
          </div>
          <Route path="/timer" component={Timer} />
        </Router>
      </AwesomeComponent>
    </div>
  );
}

export default App;
