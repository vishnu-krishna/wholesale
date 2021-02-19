import { FETCH_ACCOUNTS_SUCCESS } from "actions/actions"

const initialState = {
  accounts: []
}

export const accountListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.value
      }

    default:
      return state
  }
}
