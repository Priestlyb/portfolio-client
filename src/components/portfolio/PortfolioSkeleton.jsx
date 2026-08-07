import React from "react";
import "./portfolio.css";

const PortfolioSkeleton = () => {
  return (
    <div className="portfolio-card skeleton-card">
      <div className="portfolio-header">
        <div className="skeleton skeleton-image"></div>
      </div>

      <div className="portfolio-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

export default PortfolioSkeleton;
