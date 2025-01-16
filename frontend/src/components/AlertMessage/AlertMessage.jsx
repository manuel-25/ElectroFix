import React from "react";
import "./AlertMessage.css";

const AlertMessage = ({ alert, onAction }) => {
  if (!alert) return null;

  const { title, message, buttons } = alert;

  return (
    <div className="alert-modal">
      <div className="alert-content">
        {title && <h2 className="alert-title">{title}</h2>}
        <p className="alert-message">{message}</p>
        <div className="alert-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => onAction(button.action)}
              className={`alert-button ${button.action}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
