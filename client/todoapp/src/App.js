import React from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import './NavBar.css'

import UserContext, {auth} from './UserContext'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import NotFound from './NotFound'
import Todo from './Todo'

import * as ROUTES from './routes'

const App = () => {
    return (
        <div>
            <UserContext.Provider value={auth} >
                <BrowserRouter>
                    <NavBar className="NavBar"/>
                    <div className="App fill-window">
                        <Switch>
                            <Route exact path={ROUTES.HOME}>
                                {/* <Todo /> */}
                                <Redirect to={ROUTES.LOGIN} />
                            </Route>
                            <Route exact path={ROUTES.LOGIN}>
                                <Login />
                            </Route>
                            <Route exact path={ROUTES.REGISTER}>
                                <Register />
                            </Route>
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}

export default App;