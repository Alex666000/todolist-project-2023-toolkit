import React, { FC, memo, useEffect } from "react"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
} from "features/todolists-list/todolists/todolists.reducer"
import { tasksThunks } from "features/todolists-list/tasks/tasks.reducer"
import { useActions } from "common/hooks"
import { AddItemForm } from "common/components"
import { TaskType } from "features/todolists-list/tasks/tasks.api"
import { Tasks } from "features/todolists-list/todolists/Todolist/Tasks/Tasks"
import { TodolistTitle } from "features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle"
import { Button, Paper } from "@mui/material"
import { OverridableStringUnion } from "@mui/types"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}
export const Todolist: FC<Props> = memo(props => {
  const { changeTodolistFilter } = useActions(todolistsActions)

  const { fetchTasks, addTask } = useActions(tasksThunks)

  useEffect(() => {
    fetchTasks(props.todolist.id)
  }, [])

  const addTaskCallback = (title: string) => {
    // .unwrap() -- чтобы не зачищалось поле когда ввели ошибку
    return addTask({ title, todolistId: props.todolist.id }).unwrap()
  }

  const onAllClickHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id: props.todolist.id })
  }

  // renderFunction
  const renderFilterButton = (
    onClick: () => void,
    buttonFilter: FilterValuesType,
    color: OverridableStringUnion<"inherit" | "primary" | "secondary">,
    text: string,
  ) => {
    return (
      <Button variant={props.todolist.filter === buttonFilter ? "outlined" : "text"} onClick={onClick} color={color}>
        {text}
      </Button>
    )
  }

  return (
    <Paper style={{ padding: "10px" }}>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks todolist={props.todolist} tasks={props.tasks} />
      <div style={{ paddingTop: "10px" }}>
        {renderFilterButton(() => onAllClickHandler("all"), "all", "inherit", "All")}
        {renderFilterButton(() => onAllClickHandler("active"), "active", "primary", "Active")}
        {renderFilterButton(() => onAllClickHandler("completed"), "completed", "secondary", "Completed")}
      </div>
    </Paper>
  )
})
