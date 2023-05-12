import { Dispatch } from "redux"
import { appActions } from "app/app.reducer"
import { ResponseType } from "../types"

/**
 * Обрабатывает ошибки, полученные от сервера, и устанавливает сообщение об ошибке в состояние приложения.
 * @template D - тип данных ответа сервера
 * @param {ResponseType<D>} data - данные ответа сервера
 * @param {Dispatch} dispatch - функция диспетчера Redux для отправки действия в хранилище
 * @param {boolean} [showError=true] - флаг, указывающий, нужно ли отображать сообщение об ошибке в пользовательском интерфейсе. По умолчанию значение установлено на true.
 * @returns {void}
 */

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true): void => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
};
