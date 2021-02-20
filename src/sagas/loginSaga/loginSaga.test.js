import { loginCall } from "sagas/loginSaga/loginSaga"
import { call, delay, put } from "redux-saga/effects"
import { loginUserApi } from "Api"
import { LOGIN_CALL_COMPLETED, LOGIN_CALL_STARTED, LOGIN_FAILURE, LOGIN_SUCCESS } from "actions/actions"
import { createBrowserHistory } from "history"


describe('Login Saga', () => {
  it('should test success scenario', () => {
    const mockHistory = createBrowserHistory()
    mockHistory.push = jest.fn()
    const mockData = {
      payload: {
        data: {
          email: 'test@a.com',
          password: '123456'
        },
        history: mockHistory

      }
    }
    const generator = loginCall(mockData)
    expect(generator.next().value).toEqual(
      call(loginUserApi)
    )
    const mockUserData = {
      data: {
        emailAddress: 'test@a.com',
        password: '123456'
      }
    }
    expect(generator.next(mockUserData).value).toEqual(
      put({ type: LOGIN_CALL_STARTED })
    )
    expect(generator.next().value).toEqual(delay(1000))
    expect(generator.next().value).toEqual(
      put({
        type: LOGIN_SUCCESS
      })
    )

    expect(generator.next().value).toEqual(
      put({
        type: LOGIN_CALL_COMPLETED
      })
    )
    expect(generator.next().value).toEqual(mockHistory.push("/home"))
  })

  it('should test failure scenario', () => {
    const mockHistory = createBrowserHistory()
    mockHistory.push = jest.fn()
    const failMockData = {
      payload: {
        data: {
          email: 'a@a.com',
          password: '235'
        },
        history: mockHistory

      }
    }
    const generator = loginCall(failMockData)
    expect(generator.next().value).toEqual(
      call(loginUserApi)
    )
    const mockUserData = {
      data: {
        emailAddress: 'test@a.com',
        password: '123456'
      }
    }
    expect(generator.next(mockUserData).value).toEqual(
      put({ type: LOGIN_CALL_STARTED })
    )
    expect(generator.next().value).toEqual(delay(1000))
    expect(generator.next().value).toEqual(
      put({
        type: LOGIN_FAILURE
      })
    )

    expect(generator.next().value).toEqual(
      put({
        type: LOGIN_CALL_COMPLETED
      })
    )
  })
})
