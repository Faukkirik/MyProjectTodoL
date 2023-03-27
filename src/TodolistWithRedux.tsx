import React, {memo, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todolistId: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodolistWithRedux = memo((props: PropsType) => {
    console.log("Todolist rendered")
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolistId])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }, [dispatch])

    let tasksForTodolist = tasks
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
    }


    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.todolistId)
    }, [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.todolistId)
    }, [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.todolistId)
    }, [props.changeFilter, props.todolistId])
    const onClickRemoveTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])
    const onChangeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }, [props.changeTodolistTitle, props.todolistId])
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={onClickRemoveTodolistHandler} color={"secondary"}><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksForTodolist.map(el=>{
                return (
                     <Task task={el} todolistId={props.todolistId} key={el.id}/>
                )
            })}
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "text"}
                    color="primary"
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "text"}
                    color="secondary"
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "text"}
                    color="inherit"
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

