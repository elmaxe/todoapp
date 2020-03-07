import React from 'react'
import {connect} from 'react-redux'

const Account = ({state}) => {
    console.log(state)
    return (
        <div>
            Account
        </div>
    )
}

export default connect(
    state => ({state})
)(Account)