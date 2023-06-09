import React, {memo, useCallback} from 'react';
import './App.css';
import {TaskType} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = memo(()=> {
    console.log("App rendered")
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const onChangeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

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

                        return <Grid item key={el.id}>
                            <Paper style={{paddingBlock: "10px"}}>
                                <TodolistWithRedux
                                    key={el.id}
                                    todolistId={el.id}
                                    title={el.title}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={onChangeTodolistTitle}
                                    changeFilter={changeFilter}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
})