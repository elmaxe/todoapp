import React from 'react'

import './CardModal.css'

const initState = {
    visible: true,
    className: "CardModal"
}

class CardModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = initState
    }

    handleClick(e) {
        console.log(e.target.className)
        if (e.target.className === "CardModal") {
            //Exit
            this.setState({visible: false, className: "CardModal hidden"})
        }
    }

    render() {
        return (
            <div className={this.state.className} onClick={this.handleClick.bind(this)}>
                <div className="CardModalContent">
                    <h1>REEEEEEEEE</h1>
                    
                </div>
            </div>
        )
    }
}

export default CardModal;