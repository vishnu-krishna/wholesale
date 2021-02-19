/*
 * action types
 */
export const LOGIN_CALL = "LOGIN_CALL"
export const LOGIN_CALL_STARTED = "LOGIN_CALL_STARTED"
export const LOGIN_CALL_COMPLETED = "LOGIN_CALL_COMPLETED"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"


export const FETCH_ACCOUNTS = "FETCH_ACCOUNTS"
export const FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS"

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS"
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS"


export const CREATE_ACCOUNT = "CREATE_ACCOUNT"
export const CREATE_ACCOUNT_CALL_STARTED = "CREATE_ACCOUNT_CALL_STARTED"
export const CREATE_ACCOUNT_CALL_COMPLETED = "CREATE_ACCOUNT_CALL_COMPLETED"
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS"
export const CREATE_ACCOUNT_FAILED = "CREATE_ACCOUNT_FAILED"


/*
 * action creators
*/

export function loginAction(data, history) {
  return { type: LOGIN_CALL, payload: { data, history } }
}

export function fetchAccountsAction() {
  return { type: FETCH_ACCOUNTS }
}

export function fetchTransactionsAction(id) {
  return { type: FETCH_TRANSACTIONS, payload: id }
}

export function createNewAccountAction(formData, history) {
  return { type: CREATE_ACCOUNT, payload: { formData, history } }
}



