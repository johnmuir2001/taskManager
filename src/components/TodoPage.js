import React, { Component } from 'react'
import TaskInput from './TaskInput'

import '../css/TodoPage.css'
import MainNav from '../components/MainNav';
import logo from "../images/GGWgoGetWork.png";


class TodoPage extends Component {
    state = {
        todo: false,
        done: true
    }

    todoButton = () => {
        this.setState({todo: false})
        console.log("This is your current tasks")
    }

    doneButton = () => {
        this.setState({todo: true})
        console.log("These are your done tasks")
    }

    render (){
        return (
            <div className="todocontainer">
                <img className="todologo" src={logo} alt="logo" />
                <div className="todomain">
                <div className="tododonebuttons">
                <button className="buttonstyle" onClick={this.todoButton}>To Do</button>
                <button className="buttonstyle" onClick={this.doneButton}>Done</button>
                </div>
                <h1>Task To Do</h1>
                
                <TaskInput todo={this.state.todo} done={this.state.done}/>
                
                <div className="mainnavcontainer">
                <MainNav/>
                
                </div>
                </div>
            </div>
        )
    }    

}

export default TodoPage;