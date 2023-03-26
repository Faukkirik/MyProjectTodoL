import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, ChangeTaskTitleAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, todolistDispatch] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, tasksDispatch] = useReducer(tasksReducer,{
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
        todolistDispatch(removeTodolistAC(todolistId))
    }
    const onChangeTodolistTitle = (title: string, todolistId: string) => {
        todolistDispatch(changeTodolistTitleAC(todolistId, title))
    }
    const removeTask = (id: string, todolistId: string) => {
        tasksDispatch(removeTaskAC(id, todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        todolistDispatch(action)
        tasksDispatch(action)
    }
    const addTask = (title: string, todolistId: string) => {
        tasksDispatch(addTaskAC(title, todolistId))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        todolistDispatch(changeTodolistFilterAC(todolistId, value))
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        tasksDispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const onChangeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        tasksDispatch(ChangeTaskTitleAC(taskId, title, todolistId))
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id]
                        if (el.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
                        }
                        return <Grid item>
                            <Paper style={{paddingBlock: "10px"}}>
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
                                    changeTaskTitle={onChangeTaskTitle}
                                    changeTodolistTitle={onChangeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}