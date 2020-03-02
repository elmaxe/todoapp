import React from 'react'

import './Alert.css'

const Alert = ({type, text}) => {
    type += " box"
    return (
        <div className={type}>
            {text}
        </div>
    )
}

export default Alert;