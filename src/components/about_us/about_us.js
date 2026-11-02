import React from "react";
import "./about_us.css";

import { useProfile } from "../../context/ProfileContext";

function Aboutus() {
  const { profile, loading } = useProfile();

  // Default content displayed until the profile loads
  const defaultAbout = {
    sectionNumber: "01",
    sectionLabel: "Introduction",
    heading: "ABOUT ME",
    paragraphs: [
      "I’m a Software Engineer focused on building modern web and mobile applications that solve real-world problems. I work across the stack, from creating intuitive user interfaces and mobile experiences to developing APIs, backend services, databases, and integrations.",

      "My work spans React, React Native, TypeScript, Node.js, Express, MongoDB, PostgreSQL, and modern cloud services. I enjoy turning ideas into production-ready applications with a strong focus on clean code, maintainable architecture, and thoughtful user experiences.",

      "I’m particularly interested in full-stack development, mobile applications, and practical applications of AI. I continuously improve my engineering skills and explore new technologies to build reliable, scalable digital products.",
    ],
  };

  // Use backend content when available, otherwise use defaults
  const about = {
    ...defaultAbout,
    ...(profile?.about || {}),
    paragraphs: Array.isArray(profile?.about?.paragraphs)
      ? profile.about.paragraphs
      : defaultAbout.paragraphs,
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <section className="about" id="about">
      <div className="about_inner">
        <div className="about_header">
          <span className="about_number">{about.sectionNumber}</span>

          <div>
            <p className="about_label">{about.sectionLabel}</p>

            <h1 className="about-title">
              {about.heading}
              <span>.</span>
            </h1>
          </div>
        </div>

        <div className="about_content">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
