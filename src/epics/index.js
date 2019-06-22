import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import {
  errorAlert,
  resetErrorAlert
} from '../reducers/errorAlert';
import {
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_LOADING,
  ERROR_ALERT_MESSAGE
} from '../constants/actions'

const errorAlertEpic = (action$, store) => {
  return action$
    .filter(action => 
      action.type === UISTATE_PROMISE_ERROR
    )
    .mapTo(errorAlert(ERROR_ALERT_MESSAGE))
}

const resetErrorAlertEpic = (action$, store) => {
  return action$
    .filter(action =>
      (store.getState().errorAlert.message &&
      store.getState().errorAlert.message !== '' &&
      action.type === UISTATE_PROMISE_LOADING)
    )
    .mapTo(resetErrorAlert())
}


const rootEpic = combineEpics(
  errorAlertEpic,
  resetErrorAlertEpic
);

export default rootEpic;
