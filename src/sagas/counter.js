import { UPDATE_COUNTER, UPDATE_COMPLETE } from "../actions/counterActions";
import { put, takeEvery,delay } from "redux-saga/effects";

export function* count(action) {
  yield delay(1000); //Delay the Counter By 1 Second
  yield put({ type: UPDATE_COMPLETE, payload: action.payload }); //Send the Final Payload to the Reducer
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchCounter() {
  yield takeEvery(UPDATE_COUNTER, count);
}
