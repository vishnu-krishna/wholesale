import { combineReducers } from "redux"
import { loginReducer } from "reducers/loginReducer"
import { accountListReducer } from "reducers/accountListReducer"
import { transactionListReducer } from "reducers/transactionListReducer"
import { createAccountReducer } from "reducers/accountCreationReducer"

export const rootReducer = combineReducers({
  loginReducer,
  accountListReducer,
  transactionListReducer,
  createAccountReducer
})
