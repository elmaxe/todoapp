import React from 'react'
import ChangePassword from './ChangePassword'
import RemoveAccount from './RemoveAccount'
import './Account.css'

const Account = ({state, actions}) =>  {
    console.log(state)
    console.log(actions)
    return (
        <div className="Account">
            <div>
                <h1>{state.auth.user.username}</h1>
                Member since XXXX
            </div>
            <ChangePassword />
            <RemoveAccount actions={actions} />
        </div>
    )
}

export default Account