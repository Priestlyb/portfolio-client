import React, { useState, useEffect } from "react";
import Portfolio from "./portfolio";
import PortfolioSkeleton from "./PortfolioSkeleton";

import { axiosInstance } from "../../config";

const URL = "/portfolios";

const fetchHandler = async () => {
  return await axiosInstance.get(URL).then((res) => res.data);
};

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search] = useState("");

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        console.log("API Response:", data);
        console.log("Portfolios:", data.portfolios);

        setPortfolios(data.portfolios || []);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPortfolios = portfolios.filter((portfolio) =>
    search === ""
      ? true
      : portfolio.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="portfolio_section" id="portfolios">
      <div className="portfolio_inner">
        {/* Section Header */}
        <div className="portfolio_heading">
          <div className="portfolio_heading_meta">
            <span className="portfolio_section_number">03</span>
            <span className="portfolio_section_label">Selected Work</span>
          </div>

          <div className="portfolio_heading_content">
            <p className="portfolio_eyebrow">RECENT PROJECTS</p>

            <h1 className="portfolio_title">
              MY
              <br />
              <span>WORK.</span>
            </h1>
          </div>

          <p className="portfolio_intro">
            A selection of websites, applications, and digital products I have
            designed and developed across different projects and technologies.
          </p>
        </div>

        {/* Projects */}
        <div className="portfolio_projects">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div className="portfolio_project_loading" key={index}>
                <PortfolioSkeleton />
              </div>
            ))
          ) : filteredPortfolios.length > 0 ? (
            filteredPortfolios.map((portfolio, index) => (
              <Portfolio
                portfolio={portfolio}
                index={index}
                key={portfolio._id}
              />
            ))
          ) : (
            <div className="portfolio_empty">
              <span>01</span>
              <p>No portfolio projects available yet.</p>
            </div>
          )}
        </div>

        {/* Bottom statement */}
        {!loading && filteredPortfolios.length > 0 && (
          <div className="portfolio_footer">
            <span className="portfolio_footer_line"></span>

            <p>
              More projects, experiments, and ideas are continuously being
              developed.
            </p>

            <span className="portfolio_footer_mark">✦</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolios;
