/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import { BrowserRouter, Route, Switch } from "react-router-dom"

// Styles
import "./style.sass"

// Pages
import Login from "./js/pages/Login"
import Hon3y from "./js/pages/Hon3y"
/*** [end of imports] ***/

class App extends Component {
  state = {
    userId: Cookies.get("userId"),
    loggedIn: false
  }

  componentDidMount = () => {
    if (this.state.userId) {
      this.setState({
        loggedIn: true
      })
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <BrowserRouter>
          <Switch>
            {/* Home */}
            <Route path="/" exact component={Hon3y} />

            {/* Reputation */}
            <Route path="/reputation/:user_id" exact component={Hon3y} />
          </Switch>
        </BrowserRouter>
      )
    } else {
      return <Login />
    }
  }
}

export default App
