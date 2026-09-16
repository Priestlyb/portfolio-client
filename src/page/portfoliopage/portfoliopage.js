import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./portfoliopage.css";

const PortfolioPage = () => {
  const { id } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axiosInstance.get(`/portfolios/${id}`);

        if (isMounted) {
          setPortfolio(res.data?.portfolio || res.data);
        }
      } catch (err) {
        console.error("Portfolio Fetch Error:", err);

        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="portfolio_detail_loading">
        <div className="portfolio_detail_loading_inner">
          <div className="portfolio_detail_loading_number skeleton"></div>

          <div className="portfolio_detail_loading_title skeleton"></div>

          <div className="portfolio_detail_loading_image skeleton"></div>
        </div>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="portfolio_detail_error">
        <div className="portfolio_detail_error_inner">
          <span>404</span>

          <h1>Project not found.</h1>

          <p>The project you are looking for could not be loaded.</p>

          <a href="/#portfolios">← Back to portfolio</a>
        </div>
      </main>
    );
  }

  const {
    _id,
    project_location,
    project_role,
    project_description,
    project_img,
    technologies,
    view_link,
    github_link,
  } = portfolio;

  const technologyList = Array.isArray(technologies)
    ? technologies
    : technologies
      ? technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <main className="portfolio_detail">
      <div className="portfolio_detail_inner">
        {/* =========================================
            TOP NAVIGATION
        ========================================= */}

        <div className="portfolio_detail_top">
          <a href="/#portfolios" className="portfolio_back">
            <span className="portfolio_back_icon">←</span>
            <span>Back to selected work</span>
          </a>

          <span className="portfolio_detail_id">
            PROJECT /{" "}
            {String(_id || id)
              .slice(-4)
              .toUpperCase()}
          </span>
        </div>

        {/* =========================================
            HERO
        ========================================= */}

        <header className="portfolio_detail_hero">
          <div className="portfolio_detail_number">PROJECT</div>

          <div className="portfolio_detail_heading">
            <p className="portfolio_detail_eyebrow">
              {project_role || "WEB DEVELOPMENT"}
            </p>

            <h1>{project_location}</h1>
          </div>

          <div className="portfolio_detail_intro">
            <span className="portfolio_detail_dot"></span>

            <p>
              A closer look at the design, development, technologies, and
              decisions behind this project.
            </p>
          </div>
        </header>

        {/* =========================================
            PROJECT IMAGE
        ========================================= */}

        <div className="portfolio_detail_visual">
          <div className="portfolio_detail_image_wrapper">
            <img
              src={project_img}
              alt={`${project_location} project`}
              className="portfolio_detail_image"
            />
          </div>

          <div className="portfolio_detail_image_caption">
            <span>PROJECT PREVIEW</span>

            <span>{project_role || "Development"}</span>
          </div>
        </div>

        {/* =========================================
            PROJECT INFORMATION
        ========================================= */}

        <section className="portfolio_detail_information">
          <div className="portfolio_detail_meta">
            <div className="portfolio_meta_item">
              <span className="portfolio_meta_label">Role</span>

              <strong>{project_role || "Development"}</strong>
            </div>

            <div className="portfolio_meta_item">
              <span className="portfolio_meta_label">Technologies</span>

              <div className="portfolio_technologies">
                {technologyList.length > 0 ? (
                  technologyList.map((technology, index) => (
                    <span key={`${technology}-${index}`}>{technology}</span>
                  ))
                ) : (
                  <span>Various technologies</span>
                )}
              </div>
            </div>
          </div>

          <div className="portfolio_detail_description">
            <span className="portfolio_description_label">
              ABOUT THE PROJECT
            </span>

            <div>
              <p>{project_description}</p>
            </div>
          </div>
        </section>

        {/* =========================================
            ACTIONS
        ========================================= */}

        <div className="portfolio_detail_actions">
          {view_link && (
            <a
              href={view_link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio_action portfolio_action_primary"
            >
              <span>View live demo</span>
              <span>↗</span>
            </a>
          )}

          {github_link && (
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio_action portfolio_action_secondary"
            >
              <span>View source code</span>
              <span>↗</span>
            </a>
          )}
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="portfolio_detail_footer">
          <span className="portfolio_detail_footer_line"></span>

          <div>
            <span>END OF PROJECT</span>
            <strong>✦</strong>
          </div>

          <a href="/#portfolios">Explore more work →</a>
        </footer>
      </div>
    </main>
  );
};

export default PortfolioPage;
