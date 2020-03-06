import React from 'react';

import './Todo.css';

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

        const isInvalid = title === '' || description === '' || dueDate === '';

        return (
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
                <div className="TodoCards">
                    {true ? "Loading..." : "List of todos"}
                </div>
            </div>
                
        )
    }
}

// const mapActionsToProps = (dispatch) => ({
//     actions: bindActionCreators({fetchTodos}, dispatch)
// })

export default Todo;

// export default connect(
//     null,
//     mapActionsToProps
// )(Todo);