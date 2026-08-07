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

        setPortfolios(data.portfolios);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="portfolio_section" id="portfolios">
      <h1
        className="edu-title"
        data-aos="fade-right"
        data-aos-anchor-placement="bottom-bottom"
      >
        WEB DEVELOPMENT PORTFOLIO.
      </h1>

      <div className="portfolio_item">
        {loading
          ? [...Array(6)].map((_, index) => (
              <div className="the_protfolio_item" key={index}>
                <PortfolioSkeleton />
              </div>
            ))
          : portfolios
              .filter((portfolio) =>
                search === ""
                  ? true
                  : portfolio.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((portfolio) => (
                <div className="the_protfolio_item" key={portfolio._id}>
                  <Portfolio portfolio={portfolio} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default Portfolios;
