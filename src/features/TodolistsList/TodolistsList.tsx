import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {todolistsActions, todolistsThunks} from 'features/TodolistsList/todolists-list/todolists/todolists.reducer'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {Todolist} from 'features/TodolistsList/todolists-list/todolists/Todolist'
import {Navigate} from 'react-router-dom'
import {useActions} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTasks} from 'features/TodolistsList/todolists-list/todolists/tasks/tasks.selectors';
import {selectTodolists} from 'features/TodolistsList/todolists-list/todolists/todolists.selectors';

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {addTodolist, fetchTodolists} = useActions(todolistsThunks)


    const {
        changeTodolistFilter
    } = useActions({...todolistsActions})

    // const {addTask: addTaskThunk, removeTask: removeTaskThunk, updateTask} = useActions(tasksThunks)
    // const {changeTodolistFilter} = useActions(todolistsActions)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        // передаем пустой объект в тех санках где ничего нет... смотри типизацию useActions...
        fetchTodolists({})
    }, [])


    const addTodolistCallback = useCallback((title: string) => {
        addTodolist(title)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist todolist={tl} tasks={allTodolistTasks}/>
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
