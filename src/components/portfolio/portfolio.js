import React from "react";
import "./portfolio.css";

const Portfolio = (props) => {
  const {
    _id,
    project_img,
    project_location,
    project_role,
    project_description,
  } = props.portfolio;

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
            View more!
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />

                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
