import React, { useEffect } from 'react'
import { useHistory } from "react-router"
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAccountsAction } from "actions/actions"

const AccountListComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const accounts = useSelector(state => state.accountListReducer.accounts)

  useEffect(() => {
    dispatch(fetchAccountsAction())
  }, [])

  const handleClick = (id) => {
    history.push(`transactions/${id}`)
  }
  return (
    <>
      {!accounts.length && (
        <div className="text-center">
          <h2>No Accounts found at the moment</h2>
        </div>
      )}
      {accounts.length && (<div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Account Type</th>
              <th scope="col">Account Status</th>
              <th scope="col">Transaction List</th>
            </tr>
            </thead>
            <tbody>
            {accounts && accounts.map(account =>
              <tr key={account.id}>
                <td>{account.firstName}</td>
                <td>{account.lastName}</td>
                <td>{account.email}</td>
                <td>{account.accountType}</td>
                <td>{account.accountStatus}</td>
                <td>
                  <button type="button" className="btn btn-info" onClick={() => handleClick(account.id)}>View Transactions</button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>)}
      <button type="button" className="btn btn-info go-back" onClick={() => history.goBack()}>Go Back</button>

    </>
  )
}

export default withRouter(AccountListComponent)
