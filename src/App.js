import React, { Component } from "react"
import "./App.css"
import { Provider } from "react-redux"
import configureStore from "./store"
import LoginComponent from "./components/login.component"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomeComponent from "components/accountList.component"
import TransactionListComponent from "./components/transactions.component"
import CreateAccountComponent from "./components/createAccount.component"

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router>
          <div className="App">
            <div className="auth-wrapper">
              <Switch>
                <Route exact path='/' component={LoginComponent}/>
                <Route path="/sign-in" component={LoginComponent}/>
                <Route path="/home" component={HomeComponent}/>
                <Route path="/create" component={CreateAccountComponent}/>
                <Route path="/transactions/:id" component={TransactionListComponent}/>
              </Switch>
            </div>
            {/*</div>*/}
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
