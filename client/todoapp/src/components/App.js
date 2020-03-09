import React from 'react'

import {BrowserRouter, Router, Switch, Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import './App.css'
import './NavBar.css'

import UserContext from './UserContext'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import NotFound from './NotFound'
import Todo from './Todo'
import ProtectedRoute from './ProtectedRoute'
import Account from './Account/Account'

import * as ROUTES from '../routes'
import history from '../history'
import { bindActionCreators } from 'redux'
import {fetchIsAuth} from '../actions/userActions'

class App extends React.Component {
    constructor(props) {
        super(props)
        
        props.actions.fetchIsAuth()
    }

    render() {
        const state = this.props.state
        return (
            <div>
                <Router history={history}>
                    <NavBar className="NavBar"/>
                    <div className="App fill-window">
                            {state.auth.hasFirstFetch ?
                                <Switch>
                                    <Route exact path={ROUTES.HOME}>
                                        <ProtectedRoute component={Todo} />
                                    </Route>
                                    <Route exact path={ROUTES.LOGIN}>
                                        <Login />
                                    </Route>
                                    <Route exact path={ROUTES.REGISTER}>
                                        <Register />
                                    </Route>
                                    <Route exact path={ROUTES.ACCOUNT}>
                                        <ProtectedRoute component={Account} />
                                    </Route>
                                    <Route component={NotFound} />
                                </Switch>
                            :
                                null
                            }
                    </div>
                </Router>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({fetchIsAuth}, dispatch)
})

export default connect(
    state => ({state}),
    mapDispatchToProps
)(App)