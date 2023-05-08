import { AppDispatch, AppRootStateType } from 'app/store';
import { handleServerNetworkError } from 'common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { appActions } from 'app/app.reducer';
import { ResponseType } from 'common/types';

// вынесли ошибку и крутилку в сторону в утилитку - убрали дублирование
// thunkAPI - под капотом принимает эти параметры в ТС...
// logic - колбек логика...
export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>, logic: Function) => {
	const {dispatch, rejectWithValue} = thunkAPI
	dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		return await logic()
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	} finally {
		// убираем крутидку в одном месте в одной функции
		dispatch(appActions.setAppStatus({status: 'idle'}))
	}
}
/*
теперь можем везде в коде убрать dispatch(appActions.setAppStatus({status: 'loading'})) крутилку....
 */

