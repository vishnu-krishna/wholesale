import { LOGIN_CALL_COMPLETED, LOGIN_CALL_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS } from "actions/actions"
import { loginReducer } from "reducers/loginReducer/loginReducer"

describe('Login Reducer', () => {
  it('should set the isLoginSuccess to be TRUE', () => {
    const state = {
      isLoginSuccess: null,
      isLoginLoading: false
    }

    const action = {
      type: LOGIN_SUCCESS,
    }

    const newState = loginReducer(state, action)
    expect(newState.isLoginSuccess).toBe(true)
  })

  it('should set the isLoginSuccess to be false', () => {
    const state = {
      isLoginSuccess: null,
      isLoginLoading: false
    }

    const action = {
      type: LOGIN_FAILURE,
    }

    const newState = loginReducer(state, action)
    expect(newState.isLoginSuccess).toBe(false)
  })

  it('should set the isLoginLoading to be true', () => {
    const state = {
      isLoginSuccess: null,
      isLoginLoading: false
    }

    const action = {
      type: LOGIN_CALL_STARTED,
    }

    const newState = loginReducer(state, action)
    expect(newState.isLoginLoading).toBe(true)
  })

  it('should set the isLoginLoading to be false', () => {
    const state = {
      isLoginSuccess: null,
      isLoginLoading: false
    }

    const action = {
      type: LOGIN_CALL_COMPLETED,
    }

    const newState = loginReducer(state, action)
    expect(newState.isLoginLoading).toBe(false)
  })
})

