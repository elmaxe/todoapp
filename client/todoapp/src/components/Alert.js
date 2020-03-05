import React from 'react'

import './Alert.css'
import { Link } from 'react-router-dom'

const Alert = ({type, text, linkText, linkPath, style}) => {
    type += " box"
    return (
        <div className={type}>
            {text}
            {linkText && <Link to={linkPath} style={style}>{linkText}</Link>}
        </div>
    )
}

export default Alert;