import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {CircularProgress, Container} from "@mui/material"
import {Login} from "features/auth/Login/Login"
import {TodolistsList} from "features/todolists-list/TodolistsList"
import {ErrorSnackbar} from "common/components"
import {useActions} from "common/hooks"
import {selectAppStatus, selectIsInitialized} from "app/app.selectors"
import {authThunks} from "features/auth/auth.reducer"
import "./App.css"
import {HeaderAppBar} from "app/HeaderAppBar";


function App() {
    const isInitialized = useSelector(selectIsInitialized)

    const {initializeApp} = useActions(authThunks)

    useEffect(() => {
        initializeApp({})
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div className='App'>
                <ErrorSnackbar/>
                <HeaderAppBar/>
                <Container
                    sx={{maxWidth: '100vw', minHeight: '100vh', margin: 0}}
                    fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
