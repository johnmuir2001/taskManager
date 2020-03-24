import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Back from "./components/Back";
import TodoPage from "./components/TodoPage";

function App() {
  return (

    <Router>
      <div className="Back">
      <Route exact path="/" component={Back} />
      </div>
      <div> 
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={Signup} />
      <Route path="/TodoPage" component={TodoPage} />
      </div>
      
    </Router>
    

  );
}

export default App;
