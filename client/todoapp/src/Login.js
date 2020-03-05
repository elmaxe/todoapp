import React from 'react'

import {Link, Redirect} from 'react-router-dom'
import './Login.css'
import * as ROUTES from './routes'

import Alert from './Alert'
import UserContext from './UserContext'

const initState = {
    username: '',
    password: '',
    fetching: false,
    error: ''
}


const Login = () => (
    <UserContext.Consumer>
        {value => value.authenticated ? 
        <Redirect to={ROUTES.HOME} />
        :
        <LoginBase auth={value}/>
    }
    </UserContext.Consumer>
)

class LoginBase extends React.Component {
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
        const {auth} = this.props

        const body = JSON.stringify({username, password})

        this.setState({fetching: true})

        fetch("/api/login", {
            method: "POST",
            credentials: "same-origin",  
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
                // auth.login()
                console.log(auth)
            } else {
                this.setState({fetching: false, error: json.error})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const {username, password, fetching, error} = this.state;
        const {auth} = this.props
        const isInvalid = username === '' || password === ''
        console.log(auth.authenticated)
        return (
            <div className="Login">
                <form className="LoginForm">
                <h1>Login</h1>
                    {error && <Alert type="danger" text={error} />}
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
                    <button className="LoginButton"
                        onClick={this.handleSubmit}
                        disabled={isInvalid || fetching}
                    >
                        {fetching ? "Logging in..." : "Login"}
                    </button>
                <div className="Links">Don't have an account? <Link to={ROUTES.REGISTER}>Register.</Link></div>
                </form>
            </div>
        )
    }
}

export default Login