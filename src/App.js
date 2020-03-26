import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Back from "./components/Back";
import TodoPage from "./components/TodoPage";
import Timesheet from "./components/Timesheet";

function App() {
  return (
    <div>
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
      </Router>
    </div>
  );
}

export default App;
