import { LOGIN_CALL_COMPLETED, LOGIN_CALL_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS } from "actions/actions"

const initialState = {
  isLoginSuccess: null,
  isLoginLoading: false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: true
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoginSuccess: false
      }

    case LOGIN_CALL_STARTED:
      return {
        ...state,
        isLoginLoading: true
      }

    case LOGIN_CALL_COMPLETED:
      return {
        ...state,
        isLoginLoading: false
      }

    default:
      return state
  }
}
