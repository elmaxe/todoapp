import React from 'react'

export const auth = {
    authenticated: false,
    user: {
        id: '',
        name: ''
    },

    login(user) {
        this.authenticated = true
        this.user = user
    },

    isAuth() {
        // this.authenticated = true
        return fetch('/api/login/isAuth', {
            method: 'GET',
            credentials: "same-origin",
        })
        .then(res => res.json())
        .then(json => {
            if (this.authenticated) return true
            this.authenticated = json.authenticated
            this.user = json.user
            // console.log("Is auth (on start?): " + auth.authenticated)
            return this.authenticated
        })
        //Check if authenticated
        //If true, set user data and athenticated to true
        //else redirect to login
    },

    logout() {
        this.authenticated = false
        this.user = {
            id: '',
            username: ''
        }
    }
}

const UserContext= React.createContext(auth);

export default UserContext;