import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId:string)=>void
}

export const Todolist = (props: PropsType) => {
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
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
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
            <AddItemForm addItem={addTask}/>
            <div>{props.tasks.map(el => {
                const onRemoveHandler = () => {
                    props.removeTask(el.id, props.todolistId)
                }
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(el.id, e.currentTarget.checked, props.todolistId)
                }
                const onChangeTaskTitle = (title: string) => {
                    props.changeTaskTitle(el.id, title, props.todolistId)
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

