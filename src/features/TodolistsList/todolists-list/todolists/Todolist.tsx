import React, {FC, memo, useEffect} from 'react'
import {TodolistDomainType} from 'features/TodolistsList/todolists-list/todolists/todolists.reducer'
import {tasksThunks} from 'features/TodolistsList/todolists-list/todolists/tasks/tasks.reducer';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components'
import {TaskType} from "features/TodolistsList/todolists-list/todolists/tasks/tasks-api";
import {FilterTasksButtons} from "features/TodolistsList/todolists-list/Todolist/FilterTasksButtons";
import Tasks from "features/TodolistsList/todolists-list/todolists/tasks/Task/Tasks";
import TodolistTitle from "features/TodolistsList/todolists-list/Todolist/TodolistTitle";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist: FC<Props> = memo(function ({todolist, tasks}) {
    const {fetchTasks, addTask,} = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTask({title, todolistId: todolist.id}).unwrap()
    }


    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks tasks={tasks} todolist={todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    </div>
})


