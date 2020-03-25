import React, { Component } from 'react'
import TaskInput from './TaskInput'
import '../css/TodoPage.css'
import MainNav from '../components/MainNav';


class TodoPage extends Component {
    state = {
        todo: false
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
            <div>
                <h1>Task To Do</h1>
                <button onClick={this.todoButton}>To Do</button>
                <button onClick={this.doneButton}>Done</button>
                <TaskInput todo={this.state.todo}/>
                <MainNav/>
            </div>
        )
    }    

}

export default TodoPage;