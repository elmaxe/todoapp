import React from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from './routes'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1>404 Not Found</h1>
            <div>The page you are looking for does not exist or you don't have access to it.</div>
            <div className="Link"><Link to={ROUTES.HOME}>Back to safety</Link></div>
        </div>
    )
}

export default NotFound;