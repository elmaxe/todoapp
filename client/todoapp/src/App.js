import React from 'react'

const initState = {
    username: '',
    password: ''
}

class App extends React.Component {
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

        fetch('http://localhost:4000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        const {username, password} = this.state;

        return (
            <div>
                <form>
                    <input 
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>
                        Sign up
                    </button>
                </form>
            </div>
        )
    }
}

export default App;