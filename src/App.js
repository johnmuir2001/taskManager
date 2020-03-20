import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Back from "./components/Back";
import Timer from "./components/timer";

function App() {
  return (
    <div>
      <Router>
        <div className="Back">
          <Nav />
          <Route exact path="/" component={Back} />
        </div>
        <div>
          <Route path="/signUp" component={Signup} />
        </div>
      </Router>
      <div>
        <Timer />
      </div>
    </div>
  );
}

export default App;
