import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {todolistsThunks} from "features/todolists-list/todolists/todolists.reducer"
import {Grid} from "@mui/material"
import {Todolist} from "./todolists/Todolist/Todolist"
import {AddItemForm} from "common/components"
import {Navigate} from "react-router-dom"
import {useActions} from "common/hooks"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import {selectTasks} from "features/todolists-list/tasks/tasks.selectors"
import {selectTodolists} from "features/todolists-list/todolists/todolists.selectors"

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {addTodolist, fetchTodolists} = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolists({})
    }, [])

    const addTodolistCallback = (title: string) => {
        return addTodolist(title).unwrap()
    }

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: "20px", maxWidth: '1900px'}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Grid>
            <Grid container spacing={3} style={{margin: "0", flexWrap: "nowrap", }}>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <div style={{width: "300px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}/>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
