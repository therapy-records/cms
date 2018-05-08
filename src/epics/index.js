import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import { authError } from '../reducers/user';

const authCheckEpic = (action$, store) => {
  return action$
    .filter(action =>
        action.type === 'UISTATE_PROMISE_ERROR' &&
        action.payload === 401
    )
    .mapTo(authError());
}

const rootEpic = combineEpics(
  authCheckEpic
);

export default rootEpic;