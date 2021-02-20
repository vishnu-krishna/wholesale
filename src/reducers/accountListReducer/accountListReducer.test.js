import { FETCH_ACCOUNTS_SUCCESS } from "actions/actions"
import { accountListReducer } from "reducers/accountListReducer/accountListReducer"

describe('Account List Reducer', () => {
  it('should set the accounts to the value received', () => {
    const state = {
      accounts: []
    }
    const mockValue = [
      {
        id: '123',
        someProperty: 'asdf'
      },
      {
        id: '2345',
        someProperty: 'asdgfsdfg'
      }]
    const action = {
      type: FETCH_ACCOUNTS_SUCCESS,
      value: mockValue
    }

    const newState = accountListReducer(state, action)
    expect(newState.accounts).toEqual(mockValue)
  })
})

