import React from 'react'
import TaskInput from './TaskInput'
import Nav from "../components/Nav";
import '../css/TodoPage.css'
import MainNav from '../components/MainNav';


const TodoPage = () => {
    return (
        <div>
            <Nav />
            <h1>Task To Do</h1>
            <TaskInput/>
            <MainNav/>
        </div>
        
    );
}
 
export default TodoPage;