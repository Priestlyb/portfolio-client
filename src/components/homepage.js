import React, { useState, useEffect } from "react";
import Navbar from './navbar/navbar';
import Header from './header/header';
import Aboutus from './about_us/about_us';
import Eduskills from './edu_skills/edu_skills';
import Experience from './experience/experience';
import Whatido from './whatido/whatido';
import Backtotop from "./back_to_top/back_to_top"
import Portfolios from './portfolio/portfolios';
import "./loader.css"
import GraphicPortfolio from "./graphic_portfolio/graphic_portfolio";

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <>

      {isLoading ? (
        <div className="home_loader_cover">
        <div className="home_loader m-3"></div>
        <div className="home_loader m-3"></div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-lg-3'>
            <Navbar />
          </div>
          <div className='col-left col-lg-9'>
            <Header />
            <Aboutus />
            <Eduskills />
            <Experience />
            <GraphicPortfolio />
            <Portfolios />
            <Whatido />
            <Backtotop />
          </div>
        </div>
      )}
    </>
  )
}

export default Homepage