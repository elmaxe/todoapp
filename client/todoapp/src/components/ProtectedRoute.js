import React from 'react'

import {Route, Redirect} from 'react-router-dom'
import * as ROUTES from '../routes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import fetchTodos, {addTodo, updateTodos, removeTodo} from '../actions/todoActions'
import setUser, {clearUser} from '../actions/userActions'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const state = rest.state
    return (
        <Route {...rest} render={(props) => (
            state.auth.authenticated ?
            <Component {...props} state={rest.state} actions={rest.actions} />
            :
            // state.fetching ? null :
            <Redirect to={ROUTES.LOGIN} />
        )} />
    )
}

const mapActionsToProps = (dispatch) => ({
    actions: bindActionCreators({fetchTodos, addTodo, setUser, clearUser, updateTodos, removeTodo}, dispatch)
})

export default connect(
    state => ({state}),
    mapActionsToProps
)(ProtectedRoute)