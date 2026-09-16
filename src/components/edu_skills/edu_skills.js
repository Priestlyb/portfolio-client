import React from "react";
import "./edu_skills.css";

function Eduskills() {
  const skills = [
    {
      name: "UI/UX Design",
      level: 95,
    },
    {
      name: "JavaScript Frameworks & Libraries",
      level: 90,
    },
    {
      name: "Responsive Design",
      level: 97,
    },
    {
      name: "Performance Optimization",
      level: 93,
    },
    {
      name: "Version Control",
      level: 80,
    },
  ];

  return (
    <section className="education">
      {/* Section Header */}
      <div className="education_header">
        <span className="section_number">06</span>

        <div className="education_heading">
          <p className="section_label">Background</p>

          <h1
            className="edu-title"
            data-aos="fade-right"
            data-aos-anchor-placement="bottom-bottom"
          >
            EDUCATION <span>&</span> SKILLS.
          </h1>
        </div>
      </div>

      <div className="education_grid">
        {/* =========================
            EDUCATION
        ========================= */}
        <div className="education_column">
          <div className="column_heading">
            <span className="heading_index">I</span>
            <h2>Education</h2>
          </div>

          <article
            className="education_card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="education_card_top">
              <div className="education_icon">
                <span>GU</span>
              </div>

              <div className="education_date">2017 — 2021</div>
            </div>

            <div className="education_card_body">
              <p className="education_level">BSC • Computer Science</p>

              <h3>Gregory University, Uturu</h3>

              <p className="education_result">Second Class</p>
            </div>

            <div className="education_divider"></div>

            <div className="education_highlight">
              <div className="highlight_icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L14.7 8.3L20.5 9.1L16.3 13.2L17.3 19L12 16.3L6.7 19L7.7 13.2L3.5 9.1L9.3 8.3L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="highlight_content">
                <span>Leadership & Community</span>

                <p>
                  <strong>Co-founder & Workshop Facilitator</strong> — Android
                  Code Club (ACC), Gregory University. Co-founded a student-led
                  STEM club, organized programming workshops, and mentored
                  students in coding best practices.
                </p>

                <small>2018 — Present</small>
              </div>
            </div>
          </article>
        </div>

        {/* =========================
            SKILLS
        ========================= */}
        <div className="skills_column">
          <div className="column_heading">
            <span className="heading_index">II</span>
            <h2>Skills</h2>
          </div>

          <div className="skills_intro" data-aos="fade-up" data-aos-delay="150">
            <p>
              I’m always eager to learn new technologies and stay current with
              the latest developments in software development. I’m focused on
              building reliable, performant, and user-friendly digital
              experiences.
            </p>

            <a
              href="https://linkedin.com/in/priestly-bassey-486278175"
              target="_blank"
              rel="noopener noreferrer"
              className="edu_skills_link"
            >
              <span>Connect on LinkedIn</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="skills">
            {skills.map((skill, index) => (
              <div
                className="skill_box"
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={200 + index * 80}
              >
                <div className="skill_header">
                  <h4>{skill.name}</h4>

                  <span>{skill.level}%</span>
                </div>

                <div className="percent">
                  <div
                    style={{
                      width: `${skill.level}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Eduskills;
