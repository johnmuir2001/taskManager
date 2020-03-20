import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Components/nav";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Back from './Components/return';

function App() {
  return (
    <Router>
      <div className="Back">
      <Nav />
      <Route exact path="/" component={Back} />
      </div>
      <div> 
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={Signup} />
      </div>
    </Router>
  );
}

export default App;


