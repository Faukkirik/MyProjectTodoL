import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (title: string)=>void
}
export const EditableSpan = (props: EditableSpanType) => {
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
            <input
                onChange={onChangeTitleHandler}
                value={title}
                onBlur={activateViewMode}
                autoFocus={true}
            /> :
            <span
                onDoubleClick={activateEditMode}
            >{props.title}</span>
    );
};

