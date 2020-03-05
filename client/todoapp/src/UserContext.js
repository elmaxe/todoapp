import React from 'react'

export const auth = {
    authenticated: false,
    user: {
        id: '',
        name: ''
    },
    login() {
        this.authenticated = true
    },
    logout() {
        this.authenticated = false
    }
}

const UserContext= React.createContext(auth);

export default UserContext;