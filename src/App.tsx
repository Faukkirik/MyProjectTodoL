import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask = (id: string) => {
        let removeT = tasks.filter(el => el.id !== id)
        setTasks(removeT)
    }
    const addTask =(title: string)=>{
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
