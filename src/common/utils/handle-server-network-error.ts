import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {appActions} from "../../app/app.reducer";

// export const _handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
// 	dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
// 	dispatch(appActions.setAppStatus({status: 'failed'}))
// }

// чтобы не типизировать error в catch:
export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    // если ошибка аксиоса
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setAppError({error}))
    } else {
        // нативная ошибка
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
/*
Error - нативная ошибка
 */