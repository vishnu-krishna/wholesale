import { LOGIN_CALL, LOGIN_CALL_COMPLETED, LOGIN_CALL_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS } from "actions/actions"
import { call, delay, put, takeEvery } from "redux-saga/effects"
import { loginUserApi } from "Api"

export function* loginCall(action) {
  const userData = yield call(loginUserApi)
  const { data: { email, password: typedPassword }, history } = action.payload
  const { emailAddress, password } = userData.data
  yield put({
    type: LOGIN_CALL_STARTED
  })
  yield delay(1000) // Fake Delay

  // Instructing middleware to dispatch corresponding action.
  if (email === emailAddress && typedPassword === password) {
    yield put({
      type: LOGIN_SUCCESS
    })
    yield put({
      type: LOGIN_CALL_COMPLETED
    })
    history.push("/home")
  } else {
    yield put({
      type: LOGIN_FAILURE
    })
    yield put({
      type: LOGIN_CALL_COMPLETED
    })
  }
}

export function* login() {
  yield takeEvery(LOGIN_CALL, loginCall)
}

