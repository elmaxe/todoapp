import React, { useState } from 'react'

import Alert from '../Alert'
import history from '../../history'

const RemoveAccount = ({actions}) => {
    const [disable, setDisabled] = useState(false)
    const [error, setError] = useState("")
    // console.log(actions)

    const click = (e) => {
        if (window.confirm("Are you sure you want to remove your account? This can't be undone.")) {
            setDisabled(true)
            fetch('/api/login/removeaccount', {
                method: "GET",
                credentials: "same-origin"
            })
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    setDisabled(false)
                    setError(json.error)
                } else {
                    actions.clearUser()
                    history.push('/')
                }
            })
        } 
    }

    return (
        <div className="RemoveAccount">
            <h2>Remove account</h2>
            {error && <Alert type="danger" text={error} />}
            <div>By removing your account all your data is removed from our server. This can't be undone.</div>
            <div>
                <button className="RemoveAccBtn" onClick={click} disabled={disable}>
                    Remove account
                </button>
            </div>
        </div>
    )
}

export default RemoveAccount