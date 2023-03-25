import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
}

export const Todolist = (props: PropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (newTaskTitle.trim() === '') {
                setError("Title is required")
                setNewTaskTitle('')
            } else {
                props.addTask(newTaskTitle, props.todolistId)
                setNewTaskTitle('')
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError("Title is required")
            setNewTaskTitle('')
        } else {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle('')
        }

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
    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onClickRemoveTodolistHandler}>X</button>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            {error && <div className={"error-message"}>{error}</div>}
            <ul>{props.tasks.map(el => {
                const onRemoveHandler = () => {
                    props.removeTask(el.id, props.todolistId)
                }
                return <li key={el.id}>
                    <input
                        type="checkbox"
                        checked={el.isDone}
                        onChange={(e) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked, props.todolistId)
                        }}
                    /> <span className={el.isDone ? "is-done" : ""}>{el.title}</span>
                    <button onClick={onRemoveHandler}>x
                    </button>
                </li>
            })}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}