import { Provider } from "react-redux"
import { createStore } from "redux"
import { fireEvent, render } from '@testing-library/react'
import { Router } from "react-router-dom"
import { accountListReducer } from "reducers/accountListReducer/accountListReducer"
import AccountListComponent from "components/accountList/accountList.component"
import React from "react"
import { createBrowserHistory } from "history"

const doRender = (
  accounts = []
) => {
  const mockHistory = createBrowserHistory()
  mockHistory.push = jest.fn()
  mockHistory.goBack = jest.fn()
  const mockStore = createStore(accountListReducer, {
    accountListReducer: {
      accounts
    }
  })
  mockStore.dispatch = jest.fn()
  const { queryByText, getByTestId, queryByTestId, getByPlaceholderText } = render(
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <AccountListComponent/>
      </Router>
    </Provider>
  )
  return { queryByText, mockStore, getByTestId, queryByTestId, getByPlaceholderText, mockHistory }
}

describe('Account List Component', () => {

  it('Should show No account found message when accounts value is empty', () => {
    const { queryByText } = doRender()
    expect(queryByText('No Accounts found at the moment')).toBeInTheDocument()
  })
  it('Should NOT show No account found message when accounts value is NOT empty', () => {
    const mockAccounts = [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "accountType": "Savings",
        "accountStatus": "Open"
      }
    ]
    const { queryByText } = doRender(mockAccounts)
    expect(queryByText('No Accounts found at the moment')).not.toBeInTheDocument()
  })
  it('Should show the field values headings and values when accounts value is NOT empty', () => {
    const mockAccounts = [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "accountType": "Savings",
        "accountStatus": "Open"
      }
    ]
    const { queryByText } = doRender(mockAccounts)
    expect(queryByText('Firstname')).toBeInTheDocument()
    expect(queryByText('John')).toBeInTheDocument()
    expect(queryByText('Lastname')).toBeInTheDocument()
    expect(queryByText('Doe')).toBeInTheDocument()
    expect(queryByText('Email')).toBeInTheDocument()
    expect(queryByText('john@gmail.com')).toBeInTheDocument()
    expect(queryByText('Account Type')).toBeInTheDocument()
    expect(queryByText('Savings')).toBeInTheDocument()
    expect(queryByText('Account Status')).toBeInTheDocument()
    expect(queryByText('Open')).toBeInTheDocument()
    expect(queryByText('Transaction List')).toBeInTheDocument()
  })

  it('Should route to the transaction list page when view transaction button is clicked', () => {
    const mockAccounts = [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "accountType": "Savings",
        "accountStatus": "Open"
      }
    ]
    const { queryByText, mockHistory } = doRender(mockAccounts)
    fireEvent.click(queryByText('View Transactions'))
    expect(mockHistory.push).toHaveBeenCalledWith('transactions/1')
  })
  it('Should route to the new account creation page when view Create new account button is clicked', () => {
    const mockAccounts = [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "accountType": "Savings",
        "accountStatus": "Open"
      }
    ]
    const { queryByText, mockHistory } = doRender(mockAccounts)
    fireEvent.click(queryByText('Create New Account'))
    expect(mockHistory.push).toHaveBeenCalledWith('/create')
  })

  it('Should route to previous page when go back button is clicked', () => {
    const mockAccounts = [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@gmail.com",
        "accountType": "Savings",
        "accountStatus": "Open"
      }
    ]
    const { queryByText, mockHistory } = doRender(mockAccounts)
    fireEvent.click(queryByText('Go Back'))
    expect(mockHistory.goBack).toHaveBeenCalled()
  })
})