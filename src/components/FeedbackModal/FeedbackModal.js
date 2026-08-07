import React from "react";
import "../../constants/styles/FeedbackModal.css";

const FeedbackModal = ({ isOpen, message, type = "success", onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <div
          className={`feedback-modal-icon ${
            type === "success" ? "feedback-success" : "feedback-error"
          }`}
        >
          {type === "success" ? "✓" : "!"}
        </div>

        <h3>{type === "success" ? "Success" : "Error"}</h3>

        <p>{message}</p>

        <button className="feedback-modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
