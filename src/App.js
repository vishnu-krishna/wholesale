import React, { Component } from "react"
import "./App.css"
import { Provider } from "react-redux"
import configureStore from "./store"
import LoginComponent from "components/Login/login.component"
import { MemoryRouter, Route, Switch } from "react-router-dom"
import HomeComponent from "components/accountList/accountList.component"
import TransactionListComponent from "components/transactionList/transactions.component"
import CreateAccountComponent from "components/createAccount/createAccount.component"

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <div className="App auth-wrapper">
            <Switch>
              <Route exact path='/' component={LoginComponent}/>
              <Route path="/sign-in" component={LoginComponent}/>
              <Route path="/home" component={HomeComponent}/>
              <Route path="/create" component={CreateAccountComponent}/>
              <Route path="/transactions/:id" component={TransactionListComponent}/>
            </Switch>
          </div>
        </MemoryRouter>
      </Provider>
    )
  }
}

export default App
