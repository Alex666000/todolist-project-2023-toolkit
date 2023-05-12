import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React, { FC } from "react"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/todolists.reducer"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title })
  }

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        style={{ position: "absolute", right: "5px", top: "-34px", padding: 0 }}
        onClick={removeTodolistHandler}
        disabled={todolist.entityStatus === "loading"}
      >
        <Delete fontSize={'small'}/>
      </IconButton>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
      </h3>
    </div>
  )
}
