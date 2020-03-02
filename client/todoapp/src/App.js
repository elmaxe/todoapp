import React from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Register from './Register'
import Login from './Login'
import NotFound from './NotFound'

import * as ROUTES from './routes'

const App = () => {
    return (
        <div className="App fill-window">
            <BrowserRouter>
                <Switch>
                    <Route exact path={ROUTES.HOME}>
                        <Redirect to={ROUTES.LOGIN}/>
                    </Route>
                    <Route exact path={ROUTES.LOGIN}>
                        <Login />
                    </Route>
                    <Route exact path={ROUTES.REGISTER}>
                        <Register />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;