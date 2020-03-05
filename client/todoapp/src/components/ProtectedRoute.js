import React from 'react'

import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../routes'
import {connect} from 'react-redux'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const state = rest.state
    return (
        <Route {...rest} render={(props) => (
            state.auth.authenticated ?
            <Component {...props} />
            :
            // state.fetching ? null :
            <Redirect to={ROUTES.LOGIN} />
        )} />
    )
}

export default connect(
    state => ({state})
)(ProtectedRoute)