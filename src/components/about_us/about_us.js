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
            As a skilled Software Engineer with years of self-development
            experience, I specialize in building responsive, user-friendly
            applications and websites using technologies such as HTML, CSS,
            JavaScript, React, TypeScript, Node.js, MongoDB, and Firebase.
          </p>

          <p>
            My portfolio showcases a range of projects that demonstrate my
            approach to frontend development, application architecture, API
            integration, and creating intuitive digital experiences. I focus on
            writing maintainable code while building products that are
            functional, visually polished, and enjoyable to use.
          </p>

          <p>
            I also have a strong understanding of modern web development
            practices, including responsive design, performance optimization,
            accessibility, and SEO. I continuously develop my skills and explore
            new technologies to build better digital products.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
