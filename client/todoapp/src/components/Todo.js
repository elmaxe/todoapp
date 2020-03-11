import React from 'react';

import './Todo.css';
import CardModal from './CardModal'

const initState = {
    title: '',
    description: '',
    dueDate: '',
}

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = initState;

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        props.actions.fetchTodos()
    }

    handleChange(e) {
        this.setState(({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit(e) {
        e.preventDefault();
        const {title, description, dueDate} = this.state

        this.props.actions.addTodo(title, description, dueDate)

        this.setState({...initState})
        
    }

    render() {
        const {title, description, dueDate} = this.state;
        // console.log(this.props)

        const isInvalid = title === '' || description === '' || dueDate === '';

        return (
            <div className="Page">
                <CardModal />
            <div className="Todos">
                <div className="TodoInput">
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={this.handleChange}
                    />
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={this.handleChange}
                    />
                    <div className="DateAndAddRow">
                        <input 
                            id="date"
                            type="date"
                            name="dueDate"
                            value={dueDate}
                            onChange={this.handleChange}
                        />
                        <button
                            id="addButton"
                            onClick={this.handleSubmit}
                            disabled={isInvalid}
                        >
                            Add note
                        </button>
                    </div>
                </div>
            </div>
            <div className="TodoCards">
                {this.props.state.todo.fetching ? "Loading..." : this.props.state.todo.todos.map(todo => <TodoItem todo={todo}/>)}
            </div>
        </div>
                
        )
    }
}

const TodoItem = (data) => {
    const {todo} = data
    console.log(todo)
    return (
        <div>
                <div className="TodoCard">
                    <input
                        disabled
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={todo.title}
                        // onChange={this.handleChange}
                    />
                    <textarea
                        disabled
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={todo.description}
                        // onChange={this.handleChange}
                    />
                    <div className="DateAndAddRow">
                        {todo.date}
                    </div>
                    <button>
                        Edit
                    </button>
                    <button>
                        Mark as done
                    </button>
                </div>
        </div>
    )
}

// const mapActionsToProps = (dispatch) => ({
//     actions: bindActionCreators({fetchTodos}, dispatch)
// })

export default Todo;

// export default connect(
//     null,
//     mapActionsToProps
// )(Todo);