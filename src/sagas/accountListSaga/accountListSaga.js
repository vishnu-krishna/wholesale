import { FETCH_ACCOUNTS, FETCH_ACCOUNTS_SUCCESS } from "actions/actions"
import { call, put, takeEvery } from "redux-saga/effects"
import { fetchAccountApi } from "Api"

export function* fetchAccountsCall(action) {
  const accountList = yield call(fetchAccountApi)
  yield put({
    type: FETCH_ACCOUNTS_SUCCESS,
    value: accountList.data
  })
}

export function* fetchAccounts() {
  yield takeEvery(FETCH_ACCOUNTS, fetchAccountsCall)
}

