import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType ={
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false}]
    })
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }
    const addTodolist = (title: string) => {
        let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const addTask = (title: string, todolistId: string) => {
        if (title.trim() === '') {
            return
        } else {
            let newTask: TaskType = {id: v1(), title: title, isDone: false}
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        }
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}


export default App;
