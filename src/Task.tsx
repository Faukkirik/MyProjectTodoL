import {useDispatch} from "react-redux";
import {changeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodolistWithRedux";

export type TaskPropsType = {
    task: TaskType
    todolistId: string


}
export const Task = memo((props: TaskPropsType) => {
    console.log("Task rendered")
    const dispatch = useDispatch()
    // const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolistId])

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    },[props.task.id, props.todolistId])
    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    },[props.task.id, props.todolistId])
    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(ChangeTaskTitleAC(props.task.id, title, props.todolistId))
    },[props.task.id, props.todolistId])
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={onChangeTaskStatus}
            />
            <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={onRemoveHandler} color={"primary"}>
                <Delete/>
            </IconButton>
        </div>
    )
})