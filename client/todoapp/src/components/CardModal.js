import React from 'react'

import './CardModal.css'

class CardModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.todo.title,
            description: props.todo.description,
            date: props.todo.date,    
        }
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
        // this.cancel = this.cancel.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    save() {

        const body = JSON.stringify({
            id: this.props.todo.id,
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.date
        })
        
        fetch('/api/todo/update', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then(
            response => response.json(),
            error => {
                console.log(error)
            }
        )
        .then(
            json => {
                this.props.actions.updateTodos(json.todos)
                this.props.cancel()
            }
        )
    }

    render() {
        const {title, description, date} = this.state



        return (
            <div>
                {this.props.enabled ?
                    <div className="CardModal">
                        <div className="CardModalContent">
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
                                    name="date"
                                    value={date}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button onClick={this.props.cancel} id="cancelButton">
                                Cancel
                            </button>
                            <button onClick={console.log} id="deleteButton">
                                Delete
                            </button>
                            <button onClick={this.save} id="saveButton">
                                Save
                            </button>
                        </div>
                    </div>
                :
                null}
            </div>
        )
    }
}

export default CardModal;