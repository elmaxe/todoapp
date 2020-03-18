import React from 'react'

import './CardModal.css'

class CardModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.todo.title,
            description: props.todo.description,
            date: props.todo.date,
            deleting: false,
            saving: false
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

        this.setState({saving: true})

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
                this.setState({saving:false})
            }
        )
    }

    delete() {
        this.setState({deleting: true})
        this.props.actions.removeTodo(this.props.todo.id)
    }

    cancel() {
        const {title, description, date} = this.props.todo
        this.setState({
            title,
            description,
            date
        })
        this.props.cancel()
    }

    render() {
        const {title, description, date} = this.state

        const changed = this.props.todo.title !== title || this.props.todo.description !== description || this.props.todo.date !== date
        console.log(changed)

        // console.log(this.props.removing)
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
                            <button
                                // onClick={this.props.cancel}
                                onClick={this.cancel.bind(this)}
                                id="cancelButton"
                                >
                                Cancel
                            </button>
                            <button
                                onClick={this.delete.bind(this)}
                                id="deleteButton"
                                disabled={this.state.deleting || this.state.saving}
                                >
                                {this.state.deleting ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={this.save}
                                id="saveButton"
                                disabled={this.state.deleting || this.state.saving || !changed}
                                >
                                {this.state.saving ? "Saving..." : "Save"}
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
