import React from 'react'

import {Link} from 'react-router-dom'
import * as ROUTES from './routes'

const initState = {

}

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = initState
    }

    render() {
        return (
            <div>
                {true ? <Auth /> : null}
            </div>
        )
    }
}

const Auth = () => {
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
                    <Link to={ROUTES.LOGOUT}>Log out</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar