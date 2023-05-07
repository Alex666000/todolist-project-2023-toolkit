import { Dispatch } from 'redux';
import { appActions } from 'app/app.reducer';
import { ResponseType } from '../types';


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true
) => {
	if (showError) {
		dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
	}
}

/*
-- Передача параметра по умолчанию:
по умолчанию true -- чтобы не ругался в других санках используем в санке в любой где нам нужно показ ошибки
: используем в санки login..........
true начит тут как опциональный параметр...  showError: boolean = true стр 6
 */