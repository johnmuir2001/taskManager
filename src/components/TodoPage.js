import React from 'react'
import TaskInput from './TaskInput'
import '../css/TodoPage.css'
import MainNav from '../components/MainNav';


const TodoPage = () => {
    return (
        <div>
            <MainNav/>
            <h1>Task To Do</h1>
            <TaskInput/>
        </div>
        
    );
}
 
export default TodoPage;