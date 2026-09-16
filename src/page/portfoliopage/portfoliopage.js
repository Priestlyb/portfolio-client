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
      <main className="portfolio_showcase_loading">
        <div className="portfolio_showcase_loading_inner">
          <div className="portfolio_loading_top">
            <span></span>
            <span></span>
          </div>

          <div className="portfolio_loading_title"></div>

          <div className="portfolio_loading_image"></div>
        </div>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="portfolio_showcase_error">
        <div className="portfolio_error_content">
          <span className="portfolio_error_code">404 / PROJECT</span>

          <h1>
            Project
            <br />
            <em>not found.</em>
          </h1>

          <p>The project you are looking for could not be loaded.</p>

          <a href="/#portfolios">
            <span>←</span>
            Back to selected work
          </a>
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
    <main className="portfolio_showcase">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="portfolio_showcase_hero">
        <div className="portfolio_showcase_hero_grid"></div>

        <div className="portfolio_showcase_nav">
          <a href="/#portfolios" className="portfolio_showcase_back">
            <span className="portfolio_back_circle">←</span>
            <span>Selected Work</span>
          </a>

          <span className="portfolio_showcase_index">
            PROJECT /{" "}
            {String(_id || id)
              .slice(-4)
              .toUpperCase()}
          </span>
        </div>

        <div className="portfolio_showcase_hero_content">
          <div className="portfolio_showcase_category">
            <span className="portfolio_category_line"></span>
            <span>{project_role || "WEB DEVELOPMENT"}</span>
          </div>

          <div className="portfolio_showcase_title_row">
            <span className="portfolio_showcase_number">0{1}</span>

            <h1>
              {project_location}
              <span>.</span>
            </h1>
          </div>

          <div className="portfolio_showcase_hero_bottom">
            <p>
              A digital project focused on thoughtful design, purposeful
              development, and a clear user experience.
            </p>

            <span className="portfolio_scroll_hint">
              SCROLL TO EXPLORE
              <span>↓</span>
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}

      <section className="portfolio_showcase_preview">
        <div className="portfolio_showcase_preview_header">
          <span>01 — PROJECT PREVIEW</span>

          <span>{project_role || "DEVELOPMENT"}</span>
        </div>

        <div className="portfolio_showcase_image_wrap">
          <div className="portfolio_showcase_image_number">
            <span>PROJECT</span>
            <strong>01</strong>
          </div>

          <img
            src={project_img}
            alt={`${project_location} project`}
            className="portfolio_showcase_image"
          />

          <div className="portfolio_showcase_image_overlay">
            <span>SELECTED WORK</span>
            <span>✦</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT DETAILS
      ===================================================== */}

      <section className="portfolio_showcase_details">
        <div className="portfolio_showcase_details_intro">
          <span className="portfolio_details_kicker">02 — THE PROJECT</span>

          <h2>
            Built with
            <br />
            <em>purpose.</em>
          </h2>
        </div>

        <div className="portfolio_showcase_details_content">
          <p className="portfolio_showcase_description">
            {project_description ||
              "A digital project designed and developed with attention to usability, performance, and visual quality."}
          </p>

          <div className="portfolio_showcase_meta">
            <div className="portfolio_showcase_meta_block">
              <span>ROLE</span>
              <strong>{project_role || "Development"}</strong>
            </div>

            <div className="portfolio_showcase_meta_block">
              <span>PROJECT TYPE</span>
              <strong>Digital Product</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}

      <section className="portfolio_showcase_technologies">
        <div className="portfolio_technology_heading">
          <span>03 — TECHNOLOGY</span>
          <h2>THE STACK.</h2>
        </div>

        <div className="portfolio_technology_list">
          {technologyList.length > 0 ? (
            technologyList.map((technology, index) => (
              <div
                className="portfolio_technology_item"
                key={`${technology}-${index}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>

                <strong>{technology}</strong>

                <span className="portfolio_technology_arrow">↗</span>
              </div>
            ))
          ) : (
            <div className="portfolio_technology_item">
              <span>01</span>
              <strong>Various technologies</strong>
              <span className="portfolio_technology_arrow">↗</span>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          LINKS
      ===================================================== */}

      {(view_link || github_link) && (
        <section className="portfolio_showcase_links">
          <div className="portfolio_links_heading">
            <span>04 — EXPLORE</span>
            <h2>TAKE A LOOK.</h2>
          </div>

          <div className="portfolio_links_list">
            {view_link && (
              <a
                href={view_link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio_project_link portfolio_project_link_primary"
              >
                <div>
                  <span>LIVE EXPERIENCE</span>
                  <strong>View live project</strong>
                </div>

                <span className="portfolio_project_link_icon">↗</span>
              </a>
            )}

            {github_link && (
              <a
                href={github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio_project_link"
              >
                <div>
                  <span>SOURCE CODE</span>
                  <strong>View on GitHub</strong>
                </div>

                <span className="portfolio_project_link_icon">↗</span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          END
      ===================================================== */}

      <section className="portfolio_showcase_end">
        <div className="portfolio_showcase_end_top">
          <span>END OF PROJECT</span>
          <span>✦</span>
        </div>

        <h2>
          MORE
          <br />
          <span>WORK.</span>
        </h2>

        <a href="/#portfolios" className="portfolio_more_work">
          <span>Explore selected work</span>
          <span>↗</span>
        </a>

        <div className="portfolio_showcase_end_footer">
          <span>PRIESTLY PATRICK BASSEY</span>
          <span>2026</span>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
