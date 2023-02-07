import React, { useState, useEffect } from "react";
import Navbar from './navbar/navbar';
import Header from './header/header';
import Aboutus from './about_us/about_us';
import Eduskills from './edu_skills/edu_skills';
import Experience from './experience/experience';
import Whatido from './whatido/whatido';
import Testimonials from './testimonials/testimonials';
import Backtotop from "./back_to_top/back_to_top"
import Portfolios from './portfolio/portfolios';

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []); 

  return (
    <>
      <div className='row'>
        {isLoading ? (
          <div className="loader_container">
            <div class="typewriter">
    <div class="slide"><i></i></div>
    <div class="paper"></div>
    <div class="keyboard"></div>
</div>
          </div>
        ) : (
          <>
            <div className='col-lg-3'>
              <Navbar />
            </div>
            <div className='col-left col-lg-9'>
              <Header />
              <Aboutus />
              <Eduskills />
              <Experience />
              <Portfolios />
              <Whatido />
              <Testimonials />
              <Backtotop />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Homepage