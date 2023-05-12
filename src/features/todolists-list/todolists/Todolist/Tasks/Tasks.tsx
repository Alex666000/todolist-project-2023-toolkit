import React, {FC} from "react";
import {Task} from "features/todolists-list/todolists/Todolist/Tasks/Task/Task";
import {TaskStatuses} from "common/enums";
import {TodolistDomainType} from "features/todolists-list/todolists/todolists.reducer";
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import {makeStyles} from "@mui/styles";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

const useStyles = makeStyles({
    noTasks: {
        padding: "10px",
        color: "grey",
        opacity: 0.7,
        fontSize: "14px",
    },
});
type Classes = ReturnType<typeof useStyles>;

export const Tasks: FC<Props> = ({tasks, todolist}) => {

    const classes: Classes = useStyles();

    let tasksForTodolist: TaskType[] = [];

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }

    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(
            (t) => t.status === TaskStatuses.Completed
        );
    }

    return (
        <>
            {tasksForTodolist.length > 0 &&
                tasksForTodolist.map((t) => (
                    <Task key={t.id} task={t} todolistId={todolist.id}/>
                ))}
            {tasksForTodolist.length === 0 && (
                <div className={classes.noTasks}>No tasks: Please add tasks</div>
            )}
        </>
    );
};