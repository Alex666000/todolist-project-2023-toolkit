import React, { FC, memo, useEffect } from "react"
import { TodolistDomainType } from "features/todolists-list/todolists/todolists.reducer"
import { tasksThunks } from "features/todolists-list/tasks/tasks.reducer"
import { useActions } from "common/hooks"
import { AddItemForm } from "common/components"
import { TaskType } from "features/todolists-list/tasks/tasks.api"
import { FilterTasksButtons } from "features/todolists-list/todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "features/todolists-list/todolists/Todolist/Tasks/Tasks"
import { TodolistTitle } from "features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle"
import {Paper} from "@mui/material";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}
export const Todolist: FC<Props> = memo(({ todolist, tasks }) => {
    const { fetchTasks, addTask } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = (title: string) => {
        // .unwrap() -- чтобы не зачищалось поле когда ввели ошибку
        return addTask({ title, todolistId: todolist.id }).unwrap()
    }

    return (
        <Paper style={{padding: "10px"}} >
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
            <Tasks todolist={todolist} tasks={tasks} />
            <div style={{ paddingTop: "10px" }}>
                <FilterTasksButtons todolist={todolist} />
            </div>
        </Paper>
    )
})


