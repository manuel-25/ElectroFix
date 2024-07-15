import React from "react"
import './QuoteButton.css'

function QuoteButton({ text, onClick }) {
    return (
        <div className="quote-button-container">
            <button className="quote-button" onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default QuoteButton
