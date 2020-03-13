import React from 'react';

import './Todo.css';
import CardModal from './CardModal'
import editImg from '../images/create-24px.svg'

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
            <div className="Page">
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
                {/* {this.props.state.todo.fetching ? "Loading..." : this.props.state.todo.todos.map(todo => <TodoItem todo={todo} actions={this.props.actions}/>)} */}
                {this.props.state.todo.todos.map(todo => <TodoItem todo={todo} actions={this.props.actions}/>)}
            </div>
        </div>
                
        )
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            enabled: false,
            changed: false,
            removing: false,
        }
        this.cancel = this.cancel.bind(this)
    }

    edit() {
        this.setState({enabled: true})
    }

    cancel() {
        this.setState({
            enabled: false,
            changed: false
        })
    }

    reset() {

    }

    handleClick(e) {
        const {enabled} = this.state

        if (enabled) {
            //If click outside modal
            if (e.target.className === "CardModal") {
                //Exit
                this.setState({enabled: false})
                // console.log(e)
            }
        }
    }

    markAsDone() {
        this.setState({removing: true})
        this.props.actions.removeTodo(this.props.todo.id)
    }

    render() {
        const {todo} = this.props

        let color = ""
        let date = new Date(todo.date)
        let distance = (date-Date.now())/(1000*60*60)
        if (distance <= 24*7 && distance > 24*3) {
            color = "yellow"
        } else if (distance <= 24*3 && distance > 24*1) {
            color = "orange"
        } else if (distance <= 24*1) {
            color = "red"
        }

        return (
            <div onMouseDown={this.handleClick.bind(this)} style={{backgroundColor: "rgb(249, 249, 249)"}}>
                    <CardModal todo={todo} enabled={this.state.enabled} cancel={this.cancel} changed={this.state.changed} actions={this.props.actions}/>
                    <div className={"TodoCard" + " " + color}>
                        <input
                            disabled
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={todo.title}
                        />
                        <textarea
                            disabled
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={todo.description}
                        />
                        <div className="DateAndAddRow">
                            {todo.date}
                        </div>
                        <img src={editImg} alt="Edit todo" onClick={this.edit.bind(this)} className="editButton"/>
                        <button
                            className="doneButton"
                            onClick={this.markAsDone.bind(this)}
                            disabled={this.state.removing}
                            >
                            {this.state.removing ? "Loading..." : "Mark as done"}
                        </button>
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