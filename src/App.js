import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Back from './components/Back';

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


