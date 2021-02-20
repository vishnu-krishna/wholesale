import { CREATE_ACCOUNT_CALL_COMPLETED, CREATE_ACCOUNT_CALL_STARTED, CREATE_ACCOUNT_FAILED } from "actions/actions"
import { createAccountReducer } from "reducers/accountCreationReducer/accountCreationReducer"

describe('Account Creation Reducer', () => {
  it('should set the isAccountCreationFailed to be TRUE', () => {
    const state = {
      isAccountCreationFailed: null,
      isLoading: null
    }

    const action = {
      type: CREATE_ACCOUNT_FAILED,
    }

    const newState = createAccountReducer(state, action)
    expect(newState.isAccountCreationFailed).toBe(true)
  })

  it('should set the isLoading to be TRUE', () => {
    const state = {
      isAccountCreationFailed: null,
      isLoading: null
    }

    const action = {
      type: CREATE_ACCOUNT_CALL_STARTED,
    }

    const newState = createAccountReducer(state, action)
    expect(newState.isLoading).toBe(true)
  })

  it('should set the isLoading to be false', () => {
    const state = {
      isAccountCreationFailed: null,
      isLoading: null
    }

    const action = {
      type: CREATE_ACCOUNT_CALL_COMPLETED,
    }

    const newState = createAccountReducer(state, action)
    expect(newState.isLoading).toBe(false)
  })
})

