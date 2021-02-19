import { login } from "sagas/loginSaga"
import { all } from "redux-saga/effects"
import { fetchAccounts } from "sagas/accountListSaga"
import { fetchTransactions } from "sagas/transactionListSaga"
import { createAccount } from "sagas/createAccountSaga"

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([login(), fetchAccounts(), fetchTransactions(), createAccount()])
}
