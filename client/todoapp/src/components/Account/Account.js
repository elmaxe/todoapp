import React from 'react'
import ChangePassword from './ChangePassword'
import RemoveAccount from './RemoveAccount'
import './Account.css'

const Account = ({state, actions}) =>  {
    console.log(state)
    console.log(actions)
    let date = new Date(parseInt(state.auth.user.registrationDate, 10))
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()+1 < 10 ? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1
    let day = date.getUTCDate() < 10 ? "0"+date.getUTCDate() : date.getUTCDate()
    date = year + "-" + month + "-" + day
    
    return (
        <div className="Account">
            <div>
                <h1>{state.auth.user.username}</h1>
                Member since {date}
            </div>
            <ChangePassword />
            <RemoveAccount actions={actions} />
        </div>
    )
}

export default Account