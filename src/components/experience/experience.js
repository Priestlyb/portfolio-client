import React from "react";
import "./experience.css";
import imfi_logo from "./imfi_logo.jpg";
import fmoh_logo from "./fmoh_logo.jpg";
import ovena_logo from "./ovena_logo.png";

function Experience() {
  return (
    <div className="experience">
      <h1
        className="edu-title"
        data-aos="fade-right"
        data-aos-anchor-placement="bottom-bottom"
      >
        EXPERIENCE.
      </h1>

      <div className="experience_row">
        <div className="img_col">
          <img className="imfi-img" src={fmoh_logo} alt="" />
        </div>

        <div className="">
          <h4 className="job-title">ICT technician</h4>
          <p className="job-sub">
            Federal Ministry of Health | Physical | (2021-2022)
          </p>

          <ul>
            <li>
              Provided direct knowledge and training on using Excel efficiently,
              improving staff members' skills.
            </li>
            <li>
              Played a crucial role in the pension office, aiding in the
              retirement process of over 100+ staff members.
            </li>
            <li>
              Worked closely with different departments to understand their
              technology needs and provide solutions.
            </li>
            <li>
              Collaborated with network administrators (Galaxy Backbone) to
              ensure a stable and secure network environment.
            </li>
          </ul>
        </div>

        <div className="">
          <p className="job_type">NYSC</p>
        </div>
      </div>

      <div className="experience_row">
        <div className="img_col">
          <img className="imfi-img" src={imfi_logo} alt="" />
        </div>
        <div className="">
          <h4 className="job-title">Software Engineer</h4>
          <p className="job-sub">IMFI Academy | Part-Remote | (2020)</p>

          <ul>
            <li>
              Collaborate with senior developers and designers to implement
              responsive and visually appealing user interfaces.
            </li>
            <li>
              Contribute to the creation of new features and functionalities on
              the frontend.{" "}
              <a href="https://www.imfiacademy.edu.ng/">
                https://www.imfiacademy.edu.ng/
              </a>
            </li>
            <li>
              Ensure web applications are optimized for speed, performance, and
              accessibility.
            </li>
            <li>
              Gained experience in agile development methodologies and sprints.
            </li>
          </ul>
        </div>

        <div className="">
          <p className="job_type">Internship</p>
        </div>
      </div>

      <div className="experience_row">
        <div className="img_col">
          <img className="imfi-img" src={ovena_logo} alt="" />
        </div>
        <div className="">
          <h4 className="job-title">Frontend Developer</h4>
          <p className="job-sub">Ovena Technologies | Remote | (2025-2026)</p>
          <ul className="job-duty">
            {" "}
            <li>
              Collaborated with senior developers and designers to build
              responsive, user-friendly interfaces for the Ovena food ordering
              and delivery platform.
            </li>{" "}
            <li>
              Developed key features including restaurant and menu browsing,
              food ordering, favorites, order history, search, location-based
              services, and payment flows.
            </li>{" "}
            <li>
              Integrated REST APIs and backend services to enable seamless
              communication between the mobile application and server-side
              systems.
            </li>{" "}
            <li>
              Implemented reusable React Native components, custom hooks, and
              state management solutions to improve code maintainability and
              application performance.
            </li>{" "}
            <li>
              Integrated authentication, payment services, location services,
              and third-party APIs while optimizing the application for a smooth
              mobile user experience.
            </li>{" "}
          </ul>
        </div>

        <div className="">
          <p className="job_type">Full Time</p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
