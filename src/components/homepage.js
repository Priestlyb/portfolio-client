import React from "react";

import Navbar from "./navbar/navbar";
import Header from "./header/header";
import Aboutus from "./about_us/about_us";
import Eduskills from "./edu_skills/edu_skills";
import Experience from "./experience/experience";
import Whatido from "./whatido/whatido";
import QuickContact from "./quick_contact/quickContact";
import Portfolios from "./portfolio/portfolios";

import "../constants/styles/loader.css";

function Homepage() {
  return (
    <div className="home_wrapper">
      {/* 01 — Introduction */}
      <Header />

      {/* 02 — Who I am */}
      <Aboutus />

      {/* 03 — What I do */}
      <Whatido />

      {/* 04 — Selected work */}
      <Portfolios />

      {/* 05 — Professional experience */}
      <Experience />

      {/* 06 — Education & skills */}
      <Eduskills />

      {/* Global navigation / contact */}
      <QuickContact />
      <Navbar />
    </div>
  );
}

export default Homepage;
