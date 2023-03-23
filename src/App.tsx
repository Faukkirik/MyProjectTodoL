import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const task: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const task1: Array<TaskType> = [
        {id: 1, title: "Milk", isDone: false},
        {id: 2, title: "beer", isDone: true},
        {id: 3, title: "Water", isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task}/>
            <Todolist title={'What to buy'} tasks={task1}/>
        </div>
    );
}


export default App;
