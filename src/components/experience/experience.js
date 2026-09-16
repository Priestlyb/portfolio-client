import React, { useEffect, useState } from "react";
import "./experience.css";
import { axiosInstance } from "../../config";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get("/experiences");

        setExperiences(res.data?.experiences || []);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load experience information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

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

      {/* LOADING STATE */}
      {loading && (
        <div className="experience_state">
          <span className="experience_state_marker">01</span>

          <div>
            <h3>Loading experience...</h3>
            <p>Please wait while the career history is being loaded.</p>
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="experience_state experience_state_error">
          <span className="experience_state_marker">!</span>

          <div>
            <h3>Unable to load experience.</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* EXPERIENCE LIST */}
      {!loading && !error && experiences.length > 0 && (
        <div className="experience_timeline">
          {experiences.map((experience, index) => (
            <article
              className="experience_card"
              key={experience._id || `${experience.company}-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="timeline_marker">
                <span></span>
              </div>

              <div className="experience_content">
                <div className="experience_top">
                  <div className="company_logo_wrapper">
                    {experience.logo ? (
                      <img
                        className="company_logo"
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="company_logo_fallback">
                        {experience.company?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>

                  <div className="experience_main">
                    <div className="experience_title_row">
                      <div>
                        <h2 className="job-title">{experience.title}</h2>

                        <p className="job-sub">
                          <span>{experience.company}</span>

                          <span className="separator">•</span>

                          <span>{experience.location}</span>
                        </p>
                      </div>

                      <span className="job_type">{experience.type}</span>
                    </div>

                    <div className="experience_period">{experience.period}</div>
                  </div>
                </div>

                {/* CONTRIBUTIONS */}
                {experience.duties?.length > 0 && (
                  <div className="experience_details">
                    <h3>Key Contributions</h3>

                    <ul className="job-duty">
                      {experience.duties.map((duty, dutyIndex) => (
                        <li key={`${experience._id}-duty-${dutyIndex}`}>
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && experiences.length === 0 && (
        <div className="experience_state">
          <span className="experience_state_marker">00</span>

          <div>
            <h3>No experience records found.</h3>
            <p>Experience information will appear here when available.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Experience;
