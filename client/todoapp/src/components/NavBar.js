import React from 'react'

import {Link} from 'react-router-dom'
import * as ROUTES from '../routes'

import {connect} from 'react-redux'

import history from '../history'
import { bindActionCreators } from 'redux'

import {clearUser} from '../actions/userActions'

    
    
class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const state = this.props.state
        const actions = this.props.actions
        return (
        <div>
            {state.authenticated ? 
            <Auth actions={actions}/>
            :
            <NoAuth />}
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({clearUser}, dispatch)
})

export default connect(
    state => ({state: state.auth}),
    mapDispatchToProps
)(NavBar)

const NoAuth = () => (
    <div>
        <ul>
            <li>
                <span>
                Todoapp
                </span>
            </li>
            <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
            <li>
                <Link to={ROUTES.REGISTER}>Register</Link>
            </li>
        </ul>
    </div>
)

class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout() {

        fetch('/api/logout', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                return
            } else {
                document.cookie=`session=;expires=Fri, 1 Sep 1939 05:00:00 UTC`
                this.props.actions.clearUser()
                history.push('/login')
            }
        })
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <span>
                        Todoapp
                        </span>
                    </li>
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.ACCOUNT}>Account</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={this.logout}>Log out</Link>
                    </li>
                </ul>
            </div>
        )
    }

}
