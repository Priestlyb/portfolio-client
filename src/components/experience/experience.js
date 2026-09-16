import React from "react";
import "./experience.css";

import imfi_logo from "./imfi_logo.jpg";
import fmoh_logo from "./fmoh_logo.jpg";
import ovena_logo from "./ovena_logo.png";

function Experience() {
  const experiences = [
    {
      logo: ovena_logo,
      title: "Frontend Developer",
      company: "Ovena Technologies",
      location: "Remote",
      period: "2025 — Current",
      type: "Full Time",
      duties: [
        "Collaborated with senior developers and designers to build responsive, user-friendly interfaces for the Ovena food ordering and delivery platform.",
        "Developed key features including restaurant and menu browsing, food ordering, favorites, order history, search, location-based services, and payment flows.",
        "Integrated REST APIs and backend services to enable seamless communication between the mobile application and server-side systems.",
        "Implemented reusable React Native components, custom hooks, and state management solutions to improve code maintainability and application performance.",
        "Integrated authentication, payment services, location services, and third-party APIs while optimizing the application for a smooth mobile user experience.",
      ],
    },
    {
      logo: fmoh_logo,
      title: "ICT Technician",
      company: "Federal Ministry of Health",
      location: "Physical",
      period: "2021 — 2022",
      type: "NYSC",
      duties: [
        "Provided direct knowledge and training on using Excel efficiently, improving staff members' skills.",
        "Played a crucial role in the pension office, aiding in the retirement process of over 100+ staff members.",
        "Worked closely with different departments to understand their technology needs and provide solutions.",
        "Collaborated with network administrators (Galaxy Backbone) to ensure a stable and secure network environment.",
      ],
    },
    {
      logo: imfi_logo,
      title: "Software Engineer",
      company: "IMFI Academy",
      location: "Part-Remote",
      period: "2020",
      type: "Internship",
      duties: [
        "Collaborated with senior developers and designers to implement responsive and visually appealing user interfaces.",
        "Contributed to the creation of new features and functionalities on the frontend.",
        "Ensured web applications were optimized for speed, performance, and accessibility.",
        "Gained experience in agile development methodologies and sprint-based development.",
      ],
    },
  ];

  return (
    <section className="experience">
      <div className="experience_header">
        <span className="section_number">05</span>

        <div>
          <p className="section_label">Career</p>

          <h1
            className="edu-title"
            data-aos="fade-right"
            data-aos-anchor-placement="bottom-bottom"
          >
            EXPERIENCE<span>.</span>
          </h1>
        </div>
      </div>

      <div className="experience_timeline">
        {experiences.map((experience, index) => (
          <article
            className="experience_card"
            key={`${experience.company}-${index}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="timeline_marker">
              <span></span>
            </div>

            <div className="experience_content">
              <div className="experience_top">
                <div className="company_logo_wrapper">
                  <img
                    className="company_logo"
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                  />
                </div>

                <div className="experience_main">
                  <div className="experience_title_row">
                    <div>
                      <h2 className="job-title">
                        {experience.title}
                      </h2>

                      <p className="job-sub">
                        <span>{experience.company}</span>
                        <span className="separator">•</span>
                        <span>{experience.location}</span>
                      </p>
                    </div>

                    <span className="job_type">
                      {experience.type}
                    </span>
                  </div>

                  <div className="experience_period">
                    {experience.period}
                  </div>
                </div>
              </div>

              <div className="experience_details">
                <h3>Key Contributions</h3>

                <ul className="job-duty">
                  {experience.duties.map((duty, dutyIndex) => (
                    <li key={dutyIndex}>{duty}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;