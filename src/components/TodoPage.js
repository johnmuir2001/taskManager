import React, { Component } from 'react'
import TaskInput from './TaskInput'
import Nav from "../components/Nav";
import '../css/TodoPage.css'
import MainNav from '../components/MainNav';


class TodoPage extends Component {
    state = {
        todo: false,
        done: true
    }

    todoButton = () => {
        this.setState({todo: false})

        // if(this.state.done === true){
        //     this.setState({todo: false})
        // }
        console.log("This is your current tasks")
    }

    doneButton = () => {
        this.setState({todo: true})

        // if(this.state.todo === true){
        //     this.setState({done: false})
        // }
        console.log("These are your done tasks")
    }

    render (){
        return (
            <div>
                <Nav />
                <h1>Task To Do</h1>
                <button onClick={this.todoButton}>To Do</button>
                <button onClick={this.doneButton}>Done</button>
                <TaskInput todo={this.state.todo} done={this.state.done}/>
                <MainNav/>
            </div>
        )
    }    

}

export default TodoPage;