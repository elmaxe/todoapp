import React from 'react'

import {Link} from 'react-router-dom'
import './Login.css'
import * as ROUTES from './routes'

const initState = {
    username: '',
    password: ''
}


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = initState;

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const {username, password} = this.state

        const body = JSON.stringify({username, password})

        fetch("http://localhost:4000/login", {
            method: "POST",    
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (!json.error) {
                this.setState({...initState})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const {username, password} = this.state;

        const isInvalid = username === '' || password === ''

        return (
            <div className="Login">
                <form className="LoginForm">
                <h1>Login</h1>
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
                    <button className="LoginButton"
                        onClick={this.handleSubmit}
                        disabled={isInvalid}
                    >
                        Login
                    </button>
                <span className="Links"><Link to={ROUTES.REGISTER}>Register</Link></span>
                </form>
            </div>
        )
    }
}

export default Login