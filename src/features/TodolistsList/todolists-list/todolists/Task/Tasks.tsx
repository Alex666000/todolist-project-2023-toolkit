import React, {FC} from 'react';
import {Task} from "features/TodolistsList/todolists-list/todolists/Task/Task";
import {TaskStatuses} from "common/enums";
import {TodolistDomainType} from "features/TodolistsList/todolists-list/todolists/todolists.reducer";
import {TaskType} from "features/TodolistsList/todolists-list/tasks/tasks-api";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

const Tasks: FC<Props> = ({tasks, todolist}) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <>{tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)}</>
    );
};

export default Tasks;