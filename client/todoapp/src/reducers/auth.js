import  { SET_USER, CLEAR_USER, START_AUTH_FETCH, RECEIVE_AUTH_FETCH, FAILED_AUTH_FETCH } from '../actions/userActions'

const initState = {
    fetching: false,
    hasFirstFetch: false,
    authenticated: false,
    user: {
        id: "",
        username: "",
        registrationDate: ""
    }
}

const newState = (fetching, hasFirstFetch, authenticated, id, username, registrationDate) => {
    return {
        fetching,
        hasFirstFetch,
        authenticated,
        user: {
            id,
            username,
            registrationDate
        }
    }
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case SET_USER:   return newState(state.fetching, state.hasFirstFetch, action.newUser.authenticated, action.newUser.id, action.newUser.username, action.newUser.registrationDate)
        case CLEAR_USER: return newState(state.fetching, state.hasFirstFetch, false, "", "", "")
        case START_AUTH_FETCH: return newState(true, state.hasFirstFetch, state.authenticated, state.user.id, state.user.username, state.user.registrationDate)
        case RECEIVE_AUTH_FETCH: return newState(false, true, state.authenticated, state.user.id, state.user.username, state.user.registrationDate)
        case FAILED_AUTH_FETCH: return newState(false, state.hasFirstFetch, state.authenticated, state.user.id, state.user.username, state.user.registrationDate)
        default: return state
    }
}

export default auth