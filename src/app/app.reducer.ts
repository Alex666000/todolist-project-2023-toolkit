import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type AppInitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: builder => {
        builder
            // принимает 2 функции: 1) совпадения === функция-предикат (сравнения, если она вернет true мы попадем во 2 функцию и будем изменять логику в стейте) - возвращающую булево значение
            // 2) наш редюсер
            // любой экшн который мы диспатичм не важно в каком он редюсере мы всегда попадем в матчер
            // все экшены прогоняются через addMatcher()
            .addMatcher(
                (action) => {
                    console.log('addMatcher action', action)
                    // return true
                    return action.type.endsWith(('/pending'))
                },
                (state, action) => {
                    // console.log('addMatcher reducer')
                    state.status = 'loading'
                },
            )
            // обработка ошибок:
            .addMatcher(
                (action) => {
                    console.log('addMatcher action', action)
                    return action.type.endsWith(('/rejected'))
                },
                (state, action) => {
                    debugger
                    // если есть payload то достаем ошибку так
                    state.error = action.payload.messages[0]
                    // если payload нет то достаем ошибку так:
                    state.error = action.error.message
                    state.status = 'failed'
                },
            )
            // успешный кейс
            .addMatcher(
                (action) => {
                    // console.log('addMatcher action', action)
                    return action.type.endsWith(('/fulfilled'))
                },
                (state, action) => {
                    // убираем крутилку
                    state.status = 'succeeded'
                },
            )

    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
/*
-- если мой экшнтайп заканчивается на pending то буду попадать во вторую функцию в консоль  return action.type.endsWith(('/pending'))
-- endsWith - возвращает булево...ищет точное совпадение строки
 */