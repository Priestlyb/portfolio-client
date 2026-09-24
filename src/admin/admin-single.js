import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";
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

  const [actionLoading, setActionLoading] = useState(false);

  const closeFeedback = () => {
    setFeedback({
      isOpen: false,
      message: "",
      type: "success",
    });
  };

  const showFeedback = (message, type = "success") => {
    setFeedback({
      isOpen: true,
      message,
      type,
    });
  };

  const runAction = async (action, successMessage, errorMessage) => {
    try {
      setActionLoading(true);

      await action();

      showFeedback(successMessage, "success");

      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (err) {
      console.error(err);
      showFeedback(errorMessage, "error");
      setActionLoading(false);
    }
  };

  const deleteHandler = () => {
    runAction(
      () => axiosInstance.delete(`/portfolios/${_id}`),
      "Portfolio permanently deleted successfully.",
      "Unable to delete portfolio.",
    );
  };

  const softDeleteHandler = () => {
    runAction(
      () => axiosInstance.patch(`/portfolios/${_id}/soft-delete`),
      "Portfolio successfully hidden.",
      "Unable to hide portfolio.",
    );
  };

  const restoreHandler = () => {
    runAction(
      () => axiosInstance.patch(`/portfolios/${_id}/restore`),
      "Portfolio successfully restored.",
      "Unable to restore portfolio.",
    );
  };

  const trimmedDescription =
    project_description?.length > 160
      ? `${project_description.substring(0, 160)}...`
      : project_description || "No project description available.";

  return (
    <>
      <article
        className={`admin_portfolio_card ${
          isDeleted ? "admin_portfolio_card_deleted" : ""
        }`}
      >
        {/* IMAGE */}

        <a
          href={`/portfolio/${_id}`}
          className="admin_portfolio_visual"
          aria-label={`View ${project_location} project`}
        >
          <img
            src={project_img}
            alt={`${project_location} project`}
            className="admin_portfolio_img"
            loading="lazy"
          />

          <div className="admin_portfolio_image_number">PROJECT</div>

          <div className="admin_portfolio_overlay">
            <span>VIEW PROJECT</span>

            <span>
              <ArrowUpRight size={20} strokeWidth={2} />
            </span>
          </div>
        </a>

        {/* MAIN INFORMATION */}

        <div className="admin_portfolio_content">
          <div className="admin_portfolio_identity">
            <div className="admin_portfolio_heading">
              <span className="admin_portfolio_eyebrow">
                {project_role || "DEVELOPMENT"}
              </span>

              <h3>{project_location}</h3>
            </div>

            <div
              className={`admin_portfolio_status ${
                isDeleted ? "is-hidden" : "is-live"
              }`}
            >
              <span className="admin_status_dot"></span>

              <span>{isDeleted ? "HIDDEN" : "LIVE"}</span>
            </div>
          </div>

          <div className="admin_portfolio_details">
            <div className="admin_detail">
              <span>ROLE</span>
              <strong>{project_role || "Development"}</strong>
            </div>

            <div className="admin_detail">
              <span>VISIBILITY</span>
              <strong>{isDeleted ? "Private" : "Public"}</strong>
            </div>
          </div>

          <p className="admin_portfolio_description">{trimmedDescription}</p>

          <a href={`/portfolio/${_id}`} className="admin_portfolio_view">
            <span>Open project</span>

            <span>
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
          </a>
        </div>

        {/* MANAGEMENT */}

        <aside className="admin_portfolio_actions">
          <div className="admin_actions_top">
            <span>MANAGE PROJECT</span>

            {isDeleted && <span className="admin_deleted_badge">HIDDEN</span>}
          </div>

          <div className="admin_action_list">
            <a
              href={`/portfolioUpdate/${_id}`}
              className="admin_action admin_action_update"
            >
              <span className="admin_action_index">01</span>

              <span className="admin_action_label">Edit project</span>

              <span className="admin_action_arrow">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </a>

            {isDeleted ? (
              <button
                type="button"
                onClick={restoreHandler}
                className="admin_action admin_action_restore"
                disabled={actionLoading}
              >
                <span className="admin_action_index">02</span>

                <span className="admin_action_label">
                  {actionLoading ? "Restoring..." : "Restore project"}
                </span>

                <span className="admin_action_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={softDeleteHandler}
                className="admin_action admin_action_hide"
                disabled={actionLoading}
              >
                <span className="admin_action_index">02</span>

                <span className="admin_action_label">
                  {actionLoading ? "Hiding..." : "Hide project"}
                </span>

                <span className="admin_action_arrow">
                  <ArrowDownRight size={18} strokeWidth={2} />
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={deleteHandler}
              className="admin_action admin_action_delete"
              disabled={actionLoading}
            >
              <span className="admin_action_index">03</span>

              <span className="admin_action_label">
                {actionLoading ? "Deleting..." : "Delete permanently"}
              </span>

              <span className="admin_action_arrow">
                <X size={18} strokeWidth={2} />
              </span>
            </button>
          </div>
        </aside>
      </article>

      <FeedbackModal
        isOpen={feedback.isOpen}
        message={feedback.message}
        type={feedback.type}
        onClose={closeFeedback}
      />
    </>
  );
};

export default Adminsingle;
