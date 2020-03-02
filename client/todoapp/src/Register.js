import React from 'react'

import './Login.css'
import {Link} from 'react-router-dom'
import * as ROUTES from './routes'
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

        fetch('http://localhost:4000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
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
            <div className="Login">
                <form className="LoginForm">
                    <h1>Register</h1>
                    {error && <Alert type="danger" text={error}/>}
                    {success && <Alert type="success" text={success}/>}
                    <input
                        id="inputBox"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                    <input 
                        id="inputBox"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <input 
                        id="inputBox"
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
                        Register
                    </button>
                    <span className="Links"><Link to={ROUTES.LOGIN}>Login</Link></span>
                </form>
            </div>
        )
    }
}

export default Register;