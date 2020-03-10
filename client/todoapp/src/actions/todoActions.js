import { fetchIsAuth } from "./userActions"

export const FETCH_TODOS = "FETCH_TODOS"
export const RECEIVE_TODOS = "RECEIVE_TODOS"
export const FAIL_FETCH_TODOS = "FAIL_FETCH_TODOS"


const fetchTodoAction = () => {
    return {type: FETCH_TODOS}
}

const receiveTodoAction = (todos) => {
    return {type: RECEIVE_TODOS, todos}
}

const failTodoAction = (error) => {
    return {type: FAIL_FETCH_TODOS, error}
}


export default function fetchTodos () {
    return dispatch => {
        dispatch(fetchTodoAction())

        fetch('/api/todo/get', {
            method: "GET",
            credentials: "same-origin"
        })
        .then(res => res.json())
        .then(
            json => {
                if (json.error) {
                    dispatch(failTodoAction(json.error))
                    //We got an error from server.
                    //Has our session expired? This will log us out in that case
                    dispatch(fetchIsAuth())
                } else {
                    dispatch(receiveTodoAction(json.todos))
                }
            }
        )
    }
}

export function addTodo (title, description, dueDate) {

    const body = JSON.stringify({title,description, dueDate})

    return dispatch => {
        ///TODO: SET ADD/GET/REMOVE TYPE TO ACTION

        fetch('/api/todo/add', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                console.log(json.error)
                //We got an error from server.
                //Has our session expired? This will log us out in that case
                dispatch(fetchIsAuth())
            } else {
                dispatch(receiveTodoAction(json.todos))
            }
        })
    }
}

