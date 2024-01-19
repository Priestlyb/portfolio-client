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

function Homepage() {

  return (
    <>
        <div className='row'>
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
            <Backtotop />
          </div>
        </div>
    </>
  )
}

export default Homepage