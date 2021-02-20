import { call, put } from "redux-saga/effects"
import { fetchAccountApi } from "Api"
import { FETCH_ACCOUNTS_SUCCESS } from "actions/actions"
import { fetchAccountsCall } from "sagas/accountListSaga/accountListSaga"


describe('Account List Saga', () => {
  it('should test all the steps', () => {
    const mockData = {
      payload: {
        accountList: {
          data: [
            {

              "firstName": "Test",
              "lastName": "asrwert",
              "email": "a@a.com",
              "accountType": "Current",
              "accountStatus": "Pending",
              "id": "jwNQ4QT"

            }]
        }
      }
    }
    const generator = fetchAccountsCall(mockData)
    expect(generator.next().value).toEqual(
      call(fetchAccountApi)
    )
    expect(generator.next(mockData).value).toEqual(
      put({
        type: FETCH_ACCOUNTS_SUCCESS,
        value: mockData.data
      })
    )
  })
})
