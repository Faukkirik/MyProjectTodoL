import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addItem:(title: string)=>void
}

export const AddItemForm = (props: AddItemFormType) => {
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
            <input
                className={error ? "error" : ""}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}