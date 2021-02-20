import { call, delay, put } from "redux-saga/effects"
import { createAccountApi } from "Api"
import { CREATE_ACCOUNT_CALL_COMPLETED, CREATE_ACCOUNT_CALL_STARTED, CREATE_ACCOUNT_FAILED } from "actions/actions"
import { createAccountCall } from "sagas/createAccountSaga/createAccountSaga"
import { createBrowserHistory } from "history"


describe('Create Account Saga', () => {
  it('should test success scenario', () => {
    const mockHistory = createBrowserHistory()
    mockHistory.push = jest.fn()
    const mockData = {
      payload: {
        formData: {
          firstName: 'Vishnu',
          lastName: 'Chander',
          email: 'a@a.com',
          accountType: 'Savings',
          accountStatus: 'Pending'
        },
        history: mockHistory

      }
    }
    const generator = createAccountCall(mockData)
    expect(generator.next().value).toEqual(
      call(createAccountApi, mockData.payload.formData)
    )
    const mockUserData = {
      data: {
        id: '123',
        firstName: 'Vishnu',
        lastName: 'Chander',
        email: 'a@a.com',
        accountType: 'Savings',
        accountStatus: 'Pending'
      }
    }
    expect(generator.next(mockUserData).value).toEqual(
      put({ type: CREATE_ACCOUNT_CALL_STARTED })
    )
    expect(generator.next().value).toEqual(delay(1000))
    expect(generator.next().value).toEqual(
      put({
        type: CREATE_ACCOUNT_CALL_COMPLETED
      })
    )
    expect(generator.next().value).toEqual(mockHistory.push("/home"))
  })

  it('should test failure scenario', () => {
    const mockHistory = createBrowserHistory()
    mockHistory.push = jest.fn()
    const mockData = {
      payload: {
        formData: {
          firstName: 'Vishnu',
          lastName: 'Chander',
          email: 'a@a.com',
          accountType: 'Savings',
          accountStatus: 'Pending'
        },
        history: mockHistory

      }
    }
    const generator = createAccountCall(mockData)
    expect(generator.next().value).toEqual(
      call(createAccountApi, mockData.payload.formData)
    )
    const mockUserData = {
      data: {
        firstName: 'Vishnu',
        lastName: 'Chander',
        email: 'a@a.com',
        accountType: 'Savings',
        accountStatus: 'Pending'
      }
    }
    expect(generator.next(mockUserData).value).toEqual(
      put({ type: CREATE_ACCOUNT_CALL_STARTED })
    )
    expect(generator.next().value).toEqual(delay(1000))
    expect(generator.next().value).toEqual(
      put({
        type: CREATE_ACCOUNT_FAILED
      })
    )
    expect(generator.next().value).toEqual(
      put({
        type: CREATE_ACCOUNT_CALL_COMPLETED
      })
    )
  })

})
