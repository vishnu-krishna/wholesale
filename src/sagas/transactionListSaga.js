import { FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_SUCCESS } from "actions/actions"
import { call, put, takeEvery } from "redux-saga/effects"
import { fetchTransactionApi } from "Api"

export function* fetchTransactionsCall(action) {
  const transactionList = yield call(fetchTransactionApi, action.payload)
  yield put({
    type: FETCH_TRANSACTIONS_SUCCESS,
    value: transactionList.data
  })
}

export function* fetchTransactions() {
  yield takeEvery(FETCH_TRANSACTIONS, fetchTransactionsCall)
}

