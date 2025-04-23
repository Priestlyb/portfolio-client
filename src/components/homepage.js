import React from "react";
import Navbar from './navbar/navbar';
import Header from './header/header';
import Aboutus from './about_us/about_us';
import Eduskills from './edu_skills/edu_skills';
import Experience from './experience/experience';
import Whatido from './whatido/whatido';
import QuickContact from "./quick_contact/quickContact"
import Portfolios from './portfolio/portfolios';
import "./loader.css"

function Homepage() {

  return (
        <div className='home_wrapper'>
            <Header />
            <Aboutus />
            <Eduskills />
            <Experience />
            <Portfolios />
            <Whatido />
            <QuickContact />
            <Navbar />
        </div>
  )
}

export default Homepage