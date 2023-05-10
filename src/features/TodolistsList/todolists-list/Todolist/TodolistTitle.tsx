import React, {FC} from 'react';
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/todolists-list/todolists/todolists.reducer";
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType
}

const TodolistTitle:FC<Props> = ({todolist}) => {
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

    const removeTodolistHandler = () => removeTodolist(todolist.id)

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({title, id: todolist.id})
    }

    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

export default TodolistTitle;