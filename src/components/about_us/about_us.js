import React from "react";
import "./about_us.css";

function Aboutus() {
  return (
    <section className="about" id="about">
      <div className="about_inner">
        <div className="about_header">
          <span className="about_number">01</span>

          <div>
            <p className="about_label">Introduction</p>

            <h1 className="about-title">
              ABOUT ME<span>.</span>
            </h1>
          </div>
        </div>

        <div className="about_content">
          <p>
            I’m a Software Engineer focused on building modern web and mobile
            applications that solve real-world problems. I work across the
            stack, from creating intuitive user interfaces and mobile
            experiences to developing APIs, backend services, databases, and
            integrations.
          </p>

          <p>
            My work spans React, React Native, TypeScript, Node.js, Express,
            MongoDB, PostgreSQL, and modern cloud services. I enjoy turning
            ideas into production-ready applications with a strong focus on
            clean code, maintainable architecture, and thoughtful user
            experiences.
          </p>

          <p>
            I’m particularly interested in full-stack development, mobile
            applications, and practical applications of AI. I continuously
            improve my engineering skills and explore new technologies to build
            reliable, scalable digital products.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
