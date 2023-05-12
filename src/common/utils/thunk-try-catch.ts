import { AppDispatch, AppRootStateType } from "app/store"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { appActions } from "app/app.reducer"
import { ResponseType } from "common/types"

/**
 * Оборачивает асинхронную функцию в блок try-catch и обрабатывает ошибки сервера и сети.
 * @param {BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>} thunkAPI - объект API для создания асинхронных санк
 * @param {Function} logic - асинхронная функция, которая должна быть выполнена в блоке try-catch
 * @returns {Promise<any>}
 */
export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
    logic: Function
): Promise<any> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
