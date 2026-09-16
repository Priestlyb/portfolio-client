import React from "react";
import "./portfolio.css";

const PortfolioSkeleton = () => {
  return (
    <div className="portfolio_skeleton">
      {/* Project number */}
      <div className="skeleton skeleton-project-number"></div>

      {/* Project image */}
      <div className="skeleton skeleton-project-image"></div>

      {/* Project information */}
      <div className="portfolio_skeleton_content">
        <div className="skeleton skeleton-meta"></div>

        <div className="skeleton skeleton-project-title"></div>

        <div className="skeleton skeleton-description"></div>
        <div className="skeleton skeleton-description short"></div>

        <div className="skeleton skeleton-link"></div>
      </div>
    </div>
  );
};

export default PortfolioSkeleton;
