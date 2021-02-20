import { Provider } from "react-redux"
import { createStore } from "redux"
import { fireEvent, render } from '@testing-library/react'
import { Router } from "react-router-dom"
import CreateAccountComponent from "components/createAccount/createAccount.component"
import { createAccountReducer } from "reducers/accountCreationReducer/accountCreationReducer"
import { CREATE_ACCOUNT } from "actions/actions"
import { createBrowserHistory } from "history"
import React from "react"

const doRender = (
  isLoading = null,
  isAccountCreationFailed = null
) => {
  const mockHistory = createBrowserHistory()
  mockHistory.push = jest.fn()
  mockHistory.goBack = jest.fn()
  const mockStore = createStore(createAccountReducer, {
    createAccountReducer: {
      isLoading,
      isAccountCreationFailed
    }
  })
  mockStore.dispatch = jest.fn()
  const { queryByText, getByTestId, queryByTestId, getByPlaceholderText, getAllByTestId } = render(
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <CreateAccountComponent/>
      </Router>
    </Provider>
  )
  return { queryByText, mockStore, getByTestId, queryByTestId, getByPlaceholderText, mockHistory, getAllByTestId }
}

describe('Create Account Component', () => {
  it('Should throw error when we click submit button without entering anything in the input field', () => {
    const { queryByText } = doRender()
    const submitButton = queryByText('Create Account')
    fireEvent.click(submitButton)
    expect(queryByText('First Name required')).toBeInTheDocument()
    expect(queryByText('Last Name required')).toBeInTheDocument()
    expect(queryByText('Email required')).toBeInTheDocument()
  })

  it('Should throw error for firstName when only empty spaces are entered', () => {
    const { queryByText, getByPlaceholderText } = doRender()
    const submitButton = queryByText('Create Account')
    const input = getByPlaceholderText("Enter account holder's first name")
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(submitButton)
    expect(queryByText('First Name required')).toBeInTheDocument()
  })

  it('Should throw error for lastName when only empty spaces are entered', () => {
    const { queryByText, getByPlaceholderText } = doRender()
    const submitButton = queryByText('Create Account')
    const input = getByPlaceholderText("Enter account holder's last name")
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(submitButton)
    expect(queryByText('Last Name required')).toBeInTheDocument()
  })

  it('Should throw error for email address field when invalid email is entered', () => {
    const { queryByText, getByPlaceholderText } = doRender()
    const submitButton = queryByText('Create Account')
    const input = getByPlaceholderText("Enter account holder's email address")
    fireEvent.change(input, { target: { value: 'some invalid email id' } })
    fireEvent.click(submitButton)
    expect(queryByText('Email address is invalid')).toBeInTheDocument()
  })

  it('Should NOT throw error for email address field when valid email is entered', () => {
    const { queryByText, getByPlaceholderText } = doRender()
    const submitButton = queryByText('Create Account')
    const input = getByPlaceholderText("Enter account holder's email address")
    fireEvent.change(input, { target: { value: 'a@a.com' } })
    fireEvent.click(submitButton)
    expect(queryByText('Email address is invalid')).not.toBeInTheDocument()
  })

  it('Should set selected for second option', () => {
    const { getByTestId, getAllByTestId } = doRender()
    fireEvent.change(getByTestId('select'), { target: { value: 1 } })
    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeTruthy()
  })

  it('Should show new account creation failed message when accountCreation fails', () => {
    const { queryByText } = doRender(false, true)
    expect(queryByText('New Account Creation failed.')).toBeInTheDocument()
  })

  it('Should disable the submit button when the call is been made', () => {
    const { queryByText } = doRender(true)
    const submitButton = queryByText('Create Account')
    expect(submitButton).toBeDisabled()
  })

  it('Should dispatch new account creation action when all the field are correct', () => {
    const { queryByText, getByPlaceholderText, mockStore } = doRender()
    const submitButton = queryByText('Create Account')
    fireEvent.change(getByPlaceholderText("Enter account holder's first name"), { target: { value: 'Some First Name' } })
    fireEvent.change(getByPlaceholderText("Enter account holder's last name"), { target: { value: 'Some Last Name' } })
    fireEvent.change(getByPlaceholderText("Enter account holder's email address"), { target: { value: 'a@a.com' } })
    fireEvent.click(submitButton)
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: CREATE_ACCOUNT,
      payload: {
        formData: {
          firstName: 'Some First Name',
          lastName: 'Some Last Name',
          email: 'a@a.com',
          accountType: 'Savings',
          accountStatus: 'Pending'
        },
        history: expect.anything()
      }
    })
  })
  it('Should route to previous page when go back button is clicked', () => {
    const { queryByText, mockHistory } = doRender()
    fireEvent.click(queryByText('Go Back'))
    expect(mockHistory.goBack).toHaveBeenCalled()
  })
})