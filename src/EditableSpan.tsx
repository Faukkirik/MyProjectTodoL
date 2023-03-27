import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (title: string)=>void
}
export const EditableSpan = memo((props: EditableSpanType) => {
    console.log("EditableSpan rendered")
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const activateEditMode =()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode =()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler=(e: ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return (editMode ?
            <TextField
                onChange={onChangeTitleHandler}
                value={title}
                onBlur={activateViewMode}
                autoFocus={true}
            /> :
            <span
                onDoubleClick={activateEditMode}
            >{props.title}</span>
    );
});

