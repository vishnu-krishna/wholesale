import { Provider } from "react-redux"
import { createStore } from "redux"
import { fireEvent, render } from '@testing-library/react'
import { Router } from "react-router-dom"
import React from "react"
import { createBrowserHistory } from "history"
import { transactionListReducer } from "reducers/transactionListReducer/transactionListReducer"
import TransactionListComponent from "components/transactionList/transactionList.component"

const doRender = (
  transactions = []
) => {
  const mockHistory = createBrowserHistory()
  mockHistory.push = jest.fn()
  mockHistory.goBack = jest.fn()
  const mockStore = createStore(transactionListReducer, {
    transactionListReducer: {
      transactions
    }
  })
  mockStore.dispatch = jest.fn()
  const { queryByText, getByTestId, queryByTestId, getByPlaceholderText } = render(
    <Provider store={mockStore}>
      <Router history={mockHistory}>
        <TransactionListComponent/>
      </Router>
    </Provider>
  )
  return { queryByText, mockStore, getByTestId, queryByTestId, getByPlaceholderText, mockHistory }
}

describe('Transaction List Component', () => {

  it('Should show No account found message when accounts value is empty', () => {
    const { queryByText } = doRender()
    expect(queryByText('No transactions found for this account')).toBeInTheDocument()
  })
  it('Should NOT show No account found message when accounts value is NOT empty', () => {
    const mockTransactions = [
      {
        "id": "1",
        "date": "24/10/2020",
        "transactionType": "debit",
        "description": "some description",
        "accountId": "1"
      }
    ]
    const { queryByText } = doRender(mockTransactions)
    expect(queryByText('No transactions found for this account')).not.toBeInTheDocument()
  })
  it('Should show the field values headings and values when accounts value is NOT empty', () => {
    const mockTransactions = [
      {
        "id": "1",
        "date": "24/10/2020",
        "transactionType": "debit",
        "description": "some description",
        "accountId": "1"
      }
    ]
    const { queryByText } = doRender(mockTransactions)
    expect(queryByText('Date')).toBeInTheDocument()
    expect(queryByText('24/10/2020')).toBeInTheDocument()
    expect(queryByText('Transaction Type')).toBeInTheDocument()
    expect(queryByText('debit')).toBeInTheDocument()
    expect(queryByText('Description')).toBeInTheDocument()
    expect(queryByText('some description')).toBeInTheDocument()
  })
  it('Should route to previous page when go back button is clicked', () => {
    const { queryByText, mockHistory } = doRender()
    fireEvent.click(queryByText('Go Back'))
    expect(mockHistory.goBack).toHaveBeenCalled()
  })
})