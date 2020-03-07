import React from 'react'

import Alert from '../Alert'
import './Account.css'

const initState = {
    passwordOne: '',
    passwordTwo: '',
    error: '',
    success: '',
    fetching: false
}

class ChangePassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = initState
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePassSubmit(e) {
        e.preventDefault()
        const {passwordOne} = this.state
        this.setState({fetching:true})

        const body = JSON.stringify({password: passwordOne})

        fetch('/api/login/changepassword', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                this.setState({error:json.error, fetching: false, success: false})
            } else {
                this.setState({...initState}, () => {
                    this.setState({success:true})
                })
                console.log(json)
            }
        })
    }

    render() {
        const {passwordOne, passwordTwo, error, success, fetching} = this.state
        const {state} = this.props

        const isInvalid = passwordOne === '' || passwordTwo === '' || passwordOne  !== passwordTwo

        return (
            <div className="ChangePassword">
                <h2>Change password</h2>
                {error && <Alert type="danger" text={error} />}
                {success && <Alert type="success" text="Password changed" />}
                <form>
                    <label>New password</label>
                    <input
                        className="inputBox"
                        type="password"
                        name="passwordOne"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={passwordOne}
                    />
                    <label>Confirm password</label>
                    <input
                        className="inputBox"
                        type="password"
                        name="passwordTwo"
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                        value={passwordTwo}
                    />
                    <button
                        className="ChangePassButton"
                        onClick={this.handlePassSubmit.bind(this)}
                        disabled={isInvalid || fetching}
                        >
                        {fetching ?  "Changing password..." : "Change password"}
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword