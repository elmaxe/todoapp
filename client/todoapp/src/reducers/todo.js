import {FETCH_TODOS, RECEIVE_TODOS, FAIL_FETCH_TODOS, UPDATE_TODOS} from '../actions/todoActions'

const initState = {
    fetching: false,
    todos: []
}

const todo = (state = initState, action) => {
    switch (action.type) {
        case FETCH_TODOS: return {fetching: true, todos: state.todos}
        case RECEIVE_TODOS: return {fetching: false, todos: action.todos}
        case FAIL_FETCH_TODOS: return {fetching: false, todos: state.todos, error: action.error}
        case UPDATE_TODOS: return {fetching: false, todos: action.todos}
        default: return state
    }
}

export default todo