import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Send} from "@material-ui/icons";


export type AddItemFormType = {
    addItem:(title: string)=>void
}

export const AddItemForm = memo((props: AddItemFormType) => {
    console.log("AddItemForm rendered")
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
                props.addItem(newTaskTitle)
                setNewTaskTitle('')
            }
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError("Title is required")
            setNewTaskTitle('')
        } else {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }

    }
    return (
        <div>
            <TextField
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={error ? "Title is required" : "Type value"}
                variant={"outlined"}
                size={'small'}
                error={!!error}
                helperText={error}
            />
            <Button onClick={addTask} variant={"contained"} color="primary" size={'medium'}><Send/></Button>
        </div>
    )
})