import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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
    changeTodolistTitle: (title: string, todolistId:string)=>void
}

export const TodolistWithRedux = (props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolistId])

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }

    let tasksForTodolist = tasks
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
    }


    const onAllClickHandler = () => {
        props.changeFilter("all", props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todolistId)
    }
    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={onClickRemoveTodolistHandler} color={"secondary"}><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>{tasksForTodolist.map(el => {
                const onRemoveHandler = () => {
                    dispatch(removeTaskAC(el.id, props.todolistId))
                }
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(el.id, e.currentTarget.checked, props.todolistId))
                }
                const onChangeTaskTitle = (title: string) => {
                    dispatch(ChangeTaskTitleAC(el.id, title, props.todolistId))
                }
                return <div key={el.id} className={el.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        checked={el.isDone}
                        onChange={onChangeTaskStatus}
                    />
                    <EditableSpan title={el.title} onChange={onChangeTaskTitle}/>
                    <IconButton onClick={onRemoveHandler} color={"primary"}>
                        <Delete/>
                    </IconButton>
                </div>
            })}
            </div>
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
}

