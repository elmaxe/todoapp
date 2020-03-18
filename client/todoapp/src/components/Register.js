import React from 'react'

import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as ROUTES from '../routes'
import './Login.css'
import Alert from './Alert'

const initState = {
    username: '',
    password: '',
    password2: '',
    fetching: false,
    error: '',
    success: ''
}

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = initState

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state
        
        const body = JSON.stringify({username, password})

        this.setState({fetching: true, error:'', success:''})

        fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            if (!json.error) {
                this.setState(() => ({...initState}), () => {
                    this.setState({success: json.status})
                })
            } else {
                this.setState({fetching:false, error: json.error})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        const {username, password, password2, fetching, error, success} = this.state;

        const isInvalid = username === '' || password === '' || password2 === '' || password !== password2;

        return (
            <div>
                {this.props.state.auth.authenticated ?
                    // this.props.state.auth.fetching ? null :
                    <Redirect to={ROUTES.HOME} />
                : 
                <div className="Login">
                    <form className="LoginForm">
                        <h1>Register</h1>
                        {error && <Alert type="danger" text={error}/>}
                        {success && <Alert type="success" text={success + " "} linkText="Login." linkPath={ROUTES.LOGIN} />}
                        <label>Username</label>
                        <input
                            className="inputBox"
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                        <label>Password</label>
                        <input 
                            className="inputBox"
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <span><label>Confirm password</label></span>
                        <input 
                            className="inputBox"
                            type="password"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={this.handleChange}
                        />
                        <button
                            className="LoginButton"
                            onClick={this.handleSubmit}
                            disabled={isInvalid || fetching}
                        >
                            {fetching ? "Registering..." : "Register"}
                        </button>
                        <div className="Links">Already have an account? <Link to={ROUTES.LOGIN}>Login.</Link></div>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({state})
)(Register);