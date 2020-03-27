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
        const { setActive,time,activeTask } = this.props
        const { todo, done} = this.state
        return (
            <div className="todocontainer">
                <img className="todologo" src={logo} alt="logo" />
                <div className="todomain">
                    <div className="tododonebuttons">
                        <button className={this.state.todo ? "buttonstyle" : "buttonstyle hidden"} onClick={this.todoButton}>To Do</button>
                        <button className={this.state.todo ? "buttonstyle hidden" : "buttonstyle"} onClick={this.doneButton}>Done</button>
                    </div>
                    {todo ? <h1 className="todoTitle">Completed tasks</h1> : <h1 className="todoTitle">Tasks to do</h1>}
                    <TaskInput todo={todo} done={done} setActive={setActive} time={time} activeTask={activeTask}/>
                    <div className="mainnavcontainer">
                        <MainNav/>
                    </div>
                </div>

            </div>
        )
    }    

}

export default TodoPage;