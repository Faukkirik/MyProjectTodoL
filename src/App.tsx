import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask = (id: number) => {
        let removeT = tasks.filter(el => el.id !== id)
        setTasks(removeT)
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
            />
        </div>
    );
}


export default App;
