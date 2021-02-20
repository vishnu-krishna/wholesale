import { combineReducers } from "redux"
import { loginReducer } from "reducers/loginReducer/loginReducer"
import { accountListReducer } from "reducers/accountListReducer/accountListReducer"
import { transactionListReducer } from "reducers/transactionListReducer/transactionListReducer"
import { createAccountReducer } from "reducers/accountCreationReducer/accountCreationReducer"

export const rootReducer = combineReducers({
  loginReducer,
  accountListReducer,
  transactionListReducer,
  createAccountReducer
})
