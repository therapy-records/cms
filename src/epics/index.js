import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import { errorAlert } from '../reducers/errorAlert';
import {
  UISTATE_PROMISE_ERROR,
  ERROR_ALERT_MESSAGE
} from '../constants/actions'

const errorAlertEpic = (action$, store) => {
  return action$
    .filter(action => 
      action.type === UISTATE_PROMISE_ERROR
    )
    .mapTo(errorAlert(ERROR_ALERT_MESSAGE))
}

const rootEpic = combineEpics(
  errorAlertEpic
);

export default rootEpic;
