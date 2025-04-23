import React, { useState, useEffect } from "react";
import Portfolio from "./portfolio";

//Axios Request
import { axiosInstance } from "../../config";
const URL = "/portfolios";
const fetchHandler = async () => {
  return await axiosInstance.get(URL).then((res) => res.data);
};

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setPortfolios(data.portfolios));
  }, []);

  const [search] = useState("");
  console.log(search);

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
        {portfolios &&
          portfolios
            .filter((portfolio) => {
              return search.toLowerCase() === ""
                ? portfolio
                : portfolio.name.toLowerCase().includes(search);
            })
            .map((portfolio, id) => (
              <div className="the_protfolio_item" key={id}>
                <Portfolio portfolio={portfolio} />
              </div>
            ))}
      </div>
      </div>
  );
};

export default Portfolios;
