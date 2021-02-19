import React, { useEffect } from 'react'
import { useHistory, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fetchTransactionsAction } from "actions/actions"

const TransactionListComponent = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  // const [transactions, setTransactions] = useState([])
  const transactions = useSelector(state => state.transactionListReducer.transactions)

  useEffect(() => {
    dispatch(fetchTransactionsAction(id))
  }, [id])
  return (
    <>
      {!transactions.length && (
        <div className="text-center">
          <h2>No transactions found for this account</h2>
        </div>
      )}
      {
        transactions.length && (<div className="container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Transaction Type</th>
                <th scope="col">Description</th>
              </tr>
              </thead>
              <tbody>
              {transactions && transactions.map(transaction =>
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.description}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>)
      }
      <button type="button" className="btn btn-info go-back" onClick={() => history.goBack()}>Go Back</button>
    </>
  )
}

export default TransactionListComponent
