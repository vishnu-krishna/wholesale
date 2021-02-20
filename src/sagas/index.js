import { login } from "sagas/loginSaga/loginSaga"
import { all } from "redux-saga/effects"
import { fetchAccounts } from "sagas/accountListSaga/accountListSaga"
import { fetchTransactions } from "sagas/transactionListSaga/transactionListSaga"
import { createAccount } from "sagas/createAccountSaga/createAccountSaga"
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([login(), fetchAccounts(), fetchTransactions(), createAccount()])
}
