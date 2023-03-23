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
    const addTask = (title: string) => {
        if (title.trim() === '') {
            return
        } else {
            let newTask: TaskType = {id: v1(), title: title, isDone: false}
            setTasks([newTask, ...tasks])
        }
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: isDone} : el))
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
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}


export default App;
