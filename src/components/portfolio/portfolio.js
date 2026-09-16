import React from "react";
import "./portfolio.css";

const Portfolio = ({ portfolio, index = 0 }) => {
  const {
    _id,
    project_img,
    project_location,
    project_role,
    project_description,
  } = portfolio;

  const trimmedDescription =
    project_description?.length > 190
      ? `${project_description.substring(0, 190)}...`
      : project_description;

  return (
    <article className="portfolio_project">
      {/* Project Number */}
      <div className="portfolio_project_number">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Project Image */}
      <a
        href={`/portfolio/${_id}`}
        className="portfolio_project_visual"
        aria-label={`View ${project_location} project`}
      >
        <div className="portfolio_image_frame">
          <img
            src={project_img}
            alt={`${project_location} project`}
            className="portfolio_project_image"
            loading="lazy"
          />

          <div className="portfolio_image_overlay">
            <span>VIEW PROJECT</span>
            <span className="portfolio_overlay_arrow">↗</span>
          </div>
        </div>
      </a>

      {/* Project Information */}
      <div className="portfolio_project_content">
        <div className="portfolio_project_meta">
          <span>PROJECT</span>
          <span>{project_role || "Development"}</span>
        </div>

        <h2>{project_location}</h2>

        <p>{trimmedDescription}</p>

        <a href={`/portfolio/${_id}`} className="portfolio_view_link">
          <span>View project</span>
          <span className="portfolio_view_arrow">↗</span>
        </a>
      </div>
    </article>
  );
};

export default Portfolio;
