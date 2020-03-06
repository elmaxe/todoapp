import  { SET_USER, CLEAR_USER, START_AUTH_FETCH, RECEIVE_AUTH_FETCH, FAILED_AUTH_FETCH } from '../actions/userActions'

const initState = {
    fetching: false,
    hasFirstFetch: false,
    authenticated: false,
    user: {
        id: "",
        username: ""
    }
}

const newState = (fetching, hasFirstFetch, authenticated, id, username) => {
    return {
        fetching,
        hasFirstFetch,
        authenticated,
        user: {
            id,
            username
        }
    }
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case SET_USER:   return newState(state.fetching, state.hasFirstFetch, action.newUser.authenticated, action.newUser.id, action.newUser.username)
        case CLEAR_USER: return newState(state.fetching, state.hasFirstFetch, false, "", "")
        case START_AUTH_FETCH: return newState(true, state.hasFirstFetch, state.authenticated, state.user.id, state.user.username)
        case RECEIVE_AUTH_FETCH: return newState(false, true, state.authenticated, state.user.id, state.user.username)
        case FAILED_AUTH_FETCH: return newState(false, state.hasFirstFetch, state.authenticated, state.user.id, state.user.username)
        default: return state
    }
}

export default auth