import { FETCH_TRANSACTIONS_SUCCESS } from "actions/actions"

const initialState = {
  transactions: []
}

export const transactionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.value
      }

    default:
      return state
  }
}
