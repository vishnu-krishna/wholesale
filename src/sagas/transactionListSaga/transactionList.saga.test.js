import { call, put } from "redux-saga/effects"
import { fetchTransactionApi } from "Api"
import { FETCH_TRANSACTIONS_SUCCESS } from "actions/actions"
import { fetchTransactionsCall } from "sagas/transactionListSaga/transactionListSaga"


describe('Transaction List Saga', () => {
  it('should test all the steps', () => {
    const mockData = {
      payload: {
        transactionList: {
          data: [
            {
              "id": "1",
              "date": "24/10/2020",
              "transactionType": "debit",
              "description": "some description",
              "accountId": "1"
            }]
        }
      }
    }
    const generator = fetchTransactionsCall(mockData)
    expect(generator.next().value).toEqual(
      call(fetchTransactionApi, mockData.payload)
    )
    expect(generator.next(mockData).value).toEqual(
      put({
        type: FETCH_TRANSACTIONS_SUCCESS,
        value: mockData.data
      })
    )
  })
})
