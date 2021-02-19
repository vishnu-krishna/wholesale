import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_CALL_COMPLETED,
  CREATE_ACCOUNT_CALL_STARTED,
  CREATE_ACCOUNT_FAILED
} from "actions/actions"
import { call, delay, put, takeEvery } from "redux-saga/effects"
import { createAccountApi } from "Api"

export function* createAccountCall(action) {
  const { formData, history } = action.payload
  yield put({
    type: CREATE_ACCOUNT_CALL_STARTED
  })
  yield delay(1000) // Fake Delay
  const response = yield call(createAccountApi, formData)

  // Instructing middleware to dispatch corresponding action.
  if (response && response.data && response.data.id) {
    yield put({
      type: CREATE_ACCOUNT_CALL_COMPLETED
    })
    history.push("/home")
  } else {
    yield put({
      type: CREATE_ACCOUNT_FAILED
    })
    yield put({
      type: CREATE_ACCOUNT_CALL_COMPLETED
    })
  }
}

export function* createAccount() {
  yield takeEvery(CREATE_ACCOUNT, createAccountCall)
}

