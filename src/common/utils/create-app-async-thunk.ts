import {AppDispatch, AppRootStateType} from 'app/store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ResponseType} from 'common/types';

/*
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке

просто сделали обертку и добавили тиы к стандартной санке createAppAsyncThunk: ее теперь импользуем вместо старой санки но с таким же названием

- СДЕЛАЛИ ЧТОБЫ УБРАТЬ ТРЕТИЙ ПАРАМЕТР В ТИПИЗАЦИИ САНКИ
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null | ResponseType
}>()
