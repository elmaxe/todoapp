import React from 'react'
import {connect} from 'react-redux'
import ChangePassword from './ChangePassword'

const Account = ({state}) =>  {
    return (
        <div className="Account">
            <h1>{state.user.username}</h1>
            <ChangePassword />
        </div>
    )
}

export default connect(
    state => ({state:state.auth}),
    null
)(Account)