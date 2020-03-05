export const SET_USER = "SET_USER"
export const CLEAR_USER = "CLEAR_USER"


const setUser = (authenticated, id, username) => {
    return {
        type: SET_USER,
        newUser: {
            authenticated,
            id,
            username
        }
    }
}

export default setUser

export const clearUser = () => {
    return {type: CLEAR_USER}
}

export const START_AUTH_FETCH = "START_AUTH_FETCH"
export const RECEIVE_AUTH_FETCH = "RECEIVE_AUTH_FETCH"
export const FAILED_AUTH_FETCH = "FAILED_AUTH_FETCH"

export function fetchIsAuth() {
    return dispatch => {
        dispatch({type: START_AUTH_FETCH})
        
        return fetch('/api/login/isAuth', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(
            response => response.json(),
            error => {
                console.log(error)
                dispatch({type:FAILED_AUTH_FETCH})
            }
        )
        .then(json => {
            dispatch({type:RECEIVE_AUTH_FETCH})
            dispatch(setUser(json.authenticated, json.user.id, json.user.username))
        })
    }

    
}