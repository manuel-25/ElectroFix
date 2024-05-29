import React from "react"
import './QuoteButton.css'

function QuoteButton(props) {
    return (
        <div className="quote-button-container">
            <button className="quote-button">{props.text}</button>
        </div>
    )
}

export default QuoteButton