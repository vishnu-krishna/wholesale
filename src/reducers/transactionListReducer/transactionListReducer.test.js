import { FETCH_TRANSACTIONS_SUCCESS } from "actions/actions"
import { transactionListReducer } from "reducers/transactionListReducer/transactionListReducer"

describe('Transaction List Reducer', () => {
  it('should set the transactions to the value received', () => {
    const state = {
      transactions: []
    }
    const mockValue = [
      {
        id: '123',
        someProperty: 'asdf'
      },
      {
        id: '134',
        someProperty: 'someetwer'
      }]
    const action = {
      type: FETCH_TRANSACTIONS_SUCCESS,
      value: mockValue
    }

    const newState = transactionListReducer(state, action)
    expect(newState.transactions).toEqual(mockValue)
  })
})

