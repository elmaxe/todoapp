import React from 'react'

import Alert from './Alert'

const initState = {
    passwordOne: '',
    passwordTwo: '',
    error: '',
    success: ''
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

        this.setState({...initState})
    }

    render() {
        const {passwordOne, passwordTwo, error, success} = this.state
        const {state} = this.props

        const isInvalid = passwordOne === '' || passwordTwo === '' || passwordOne  !== passwordTwo

        return (
            <div>
                {error && <Alert type="danger" text={error} />}
                {success && <Alert type="success" text="Password changed" />}
                <form>
                    <input
                        type="password"
                        name="passwordOne"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={passwordOne}
                    />
                    <input
                        type="password"
                        name="passwordTwo"
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                        value={passwordTwo}
                    />
                    <button
                        onClick={this.handlePassSubmit.bind(this)}
                        disabled={isInvalid}
                        >
                        Change password
                    </button>
                </form>
            </div>
        )
    }
}

export default ChangePassword