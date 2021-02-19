import { CREATE_ACCOUNT_CALL_COMPLETED, CREATE_ACCOUNT_CALL_STARTED, CREATE_ACCOUNT_FAILED } from "actions/actions"

const initialState = {
  isAccountCreationFailed: null,
  isLoading: null
}

export const createAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_FAILED:
      return {
        ...state,
        isAccountCreationFailed: true
      }

    case CREATE_ACCOUNT_CALL_STARTED:
      return {
        ...state,
        isLoading: true
      }

    case CREATE_ACCOUNT_CALL_COMPLETED:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}
