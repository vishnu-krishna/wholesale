import { login } from "sagas/loginSaga"
import { all, takeLatest } from "redux-saga/effects"
import { fetchAccounts } from "sagas/accountListSaga"
import { fetchTransactions } from "sagas/transactionListSaga"
import { createAccount } from "sagas/createAccountSaga"
import { LOGIN_CALL } from "actions/actions"

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([takeLatest(LOGIN_CALL, login), fetchAccounts(), fetchTransactions(), createAccount()])
}
