import { Provider } from "react-redux"
import LoginComponent from "components/Login/login.component"
import { loginReducer } from "reducers/loginReducer/loginReducer"
import { createStore } from "redux"
import { fireEvent, render } from '@testing-library/react'
import { LOGIN_CALL } from "actions/actions"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import React from "react"

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const doRender = (
  isLoginSuccess = null,
  isLoginLoading = false
) => {
  const mockHistory = createBrowserHistory()
  mockHistory.push = jest.fn()
  mockHistory.goBack = jest.fn()
  const mockStore = createStore(loginReducer, {
    loginReducer: {
      isLoginSuccess,
      isLoginLoading
    }
  })
  mockStore.dispatch = jest.fn()
  const { queryByText, getByTestId, queryByTestId, getByPlaceholderText } = render(
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <LoginComponent/>
      </Router>
    </Provider>
  )
  return { queryByText, mockStore, getByTestId, queryByTestId, getByPlaceholderText, mockHistory }
}

describe('Login Component', () => {
  it('Should throw error when we click submit button without entering anything in the input field', () => {
    const { queryByText, queryByTestId } = doRender()
    const submitButton = queryByTestId('login-submit')
    fireEvent.click(submitButton)
    expect(queryByText('Email required')).toBeInTheDocument()
    expect(queryByText('Password is required')).toBeInTheDocument()
  })

  it('Should throw error for email address field when invalid email is entered', () => {
    const { queryByText, queryByTestId, getByPlaceholderText } = doRender()
    const submitButton = queryByTestId('login-submit')
    const input = getByPlaceholderText("Enter email")
    fireEvent.change(input, { target: { value: 'some invalid email id' } })
    fireEvent.click(submitButton)
    expect(queryByText('Email address is invalid')).toBeInTheDocument()
  })

  it('Should NOT throw error for email address field when valid email is entered', () => {
    const { queryByText, queryByTestId, getByPlaceholderText } = doRender()
    const submitButton = queryByTestId('login-submit')
    const input = getByPlaceholderText("Enter email")
    fireEvent.change(input, { target: { value: 'a@a.com' } })
    fireEvent.click(submitButton)
    expect(queryByText('Email address is invalid')).not.toBeInTheDocument()
  })

  it('Should throw error for password field when the field value is less than 3', () => {
    const { queryByText, queryByTestId, getByPlaceholderText } = doRender()
    const submitButton = queryByTestId('login-submit')
    const input = getByPlaceholderText("Enter password")
    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.click(submitButton)
    expect(queryByText('Password needs to be 6 characters or more')).toBeInTheDocument()
  })

  it('Should NOT throw error for password field when the field value is greater than 3', () => {
    const { queryByText, queryByTestId, getByPlaceholderText } = doRender()
    const submitButton = queryByTestId('login-submit')
    const input = getByPlaceholderText("Enter password")
    fireEvent.change(input, { target: { value: '123456' } })
    fireEvent.click(submitButton)
    expect(queryByText('Password needs to be 6 characters or more')).not.toBeInTheDocument()
  })

  it('Should show login failed message when loginSuccess value is false', () => {
    const { queryByText } = doRender(false)
    expect(queryByText('Login Failed! Try Again.')).toBeInTheDocument()
  })

  it('Should disable the submit button when the call is been made', () => {
    const { queryByTestId } = doRender(null, true)
    expect(queryByTestId('login-submit')).toBeDisabled()
  })

  it('Should dispatch login action when all the field are correct', () => {
    const { queryByTestId, getByPlaceholderText, mockStore } = doRender()
    const submitButton = queryByTestId('login-submit')
    fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: 'a@a.com' } })
    fireEvent.change(getByPlaceholderText("Enter password"), { target: { value: '123456' } })
    fireEvent.click(submitButton)
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: LOGIN_CALL,
      payload: {
        data: {
          email: 'a@a.com',
          password: '123456'
        },
        history: expect.anything()
      }
    })
  })
})