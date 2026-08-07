import React, { useState } from "react";
import "../constants/styles/Adminsingle.css";
import { axiosInstance } from "../config";
import FeedbackModal from "../components/FeedbackModal/FeedbackModal";

const Adminsingle = (props) => {

  const {
    _id,
    project_img,
    project_location,
    project_role,
    project_description,
    isDeleted,
  } = props.portfolio;

  const [feedback, setFeedback] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const closeFeedback = () => {
    setFeedback({
      isOpen: false,
      message: "",
      type: "success",
    });
  };

  const deleteHandler = async () => {
    try {
      await axiosInstance.delete(`/portfolios/${_id}`);

      setFeedback({
        isOpen: true,
        message: "Portfolio permanently deleted successfully.",
        type: "success",
      });
    } catch (err) {
      console.error(err);

      setFeedback({
        isOpen: true,
        message: "Unable to delete portfolio.",
        type: "error",
      });
    }
  };

  const softDeleteHandler = async () => {
    try {
      await axiosInstance.patch(`/portfolios/${_id}/soft-delete`);

      setFeedback({
        isOpen: true,
        message: "Portfolio successfully hidden.",
        type: "success",
      });
    } catch (err) {
      console.error(err);

      setFeedback({
        isOpen: true,
        message: "Unable to hide portfolio.",
        type: "error",
      });
    }
  };

  const restoreHandler = async () => {
    try {
      await axiosInstance.patch(`/portfolios/${_id}/restore`);

      setFeedback({
        isOpen: true,
        message: "Portfolio successfully restored.",
        type: "success",
      });
    } catch (err) {
      console.error(err);

      setFeedback({
        isOpen: true,
        message: "Unable to restore portfolio.",
        type: "error",
      });
    }
  };

  const trimmedDescription =
    project_description?.length > 175
      ? project_description.substring(0, 175) + "..."
      : project_description;

  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <img src={project_img} alt="portfolio_img" className="portfolio_img" />
      </div>

      <div className="portfolio-content">
        <h4>{project_location}</h4>
        <p>{project_role}</p>
        <p>{trimmedDescription}</p>

        <a className="css_buttons" href={`/portfolio/${_id}`}>
          <button className="cssbuttons-io-button">
            {" "}
            View more!
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </a>

        <div className="admin-action-buttons">
          {isDeleted && <p className="admin-deleted-status">Soft Deleted</p>}

          <button className="admin-update-btn">
            <a href={`/portfolioUpdate/${_id}`}>Update</a>
          </button>

          {isDeleted ? (
            <button onClick={restoreHandler} className="admin-restore-btn">
              Restore
            </button>
          ) : (
            <button
              onClick={softDeleteHandler}
              className="admin-soft-delete-btn"
            >
              Soft Delete
            </button>
          )}

          <button onClick={deleteHandler} className="admin-delete-btn">
            Delete
          </button>
        </div>
      </div>
      <FeedbackModal
        isOpen={feedback.isOpen}
        message={feedback.message}
        type={feedback.type}
        onClose={closeFeedback}
      />
    </div>
  );
};

export default Adminsingle;
