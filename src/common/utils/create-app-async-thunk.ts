import { AppDispatch, AppRootStateType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

/*
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке

просто сделали обертку и добавили тиы к стандартной санке createAppAsyncThunk: ее теперь импользуем вместо старой санки но с таким же названием
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
  data: ResponseType;
  showGlobalError: boolean;
};
