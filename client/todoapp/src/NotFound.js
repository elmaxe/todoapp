import React from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from './routes'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1>404 Not Found</h1>
            The page you are looking for does not exist.
            <br />
            <Link to={ROUTES.HOME}>Back to safety</Link>
        </div>
    )
}

export default NotFound;