import React from "react";
import "./whatido.css";
import { ArrowUpRight } from "lucide-react";

function Whatido() {
  const services = [
    {
      number: "I",
      icon: "fa-solid fa-code",
      title: "Frontend Development",
      description:
        "Building responsive and interactive web applications with modern frontend technologies, clean architecture, and attention to user experience.",
      tags: ["React", "TypeScript", "Responsive UI"],
    },
    {
      number: "II",
      icon: "fa-solid fa-mobile-screen",
      title: "Mobile App Development",
      description:
        "Developing cross-platform mobile applications with React Native and Expo, from user interfaces to APIs, authentication, payments, and device integrations.",
      tags: ["React Native", "Expo", "Mobile Apps"],
    },
    {
      number: "III",
      icon: "fa-solid fa-server",
      title: "Backend Development",
      description:
        "Building reliable backend services and REST APIs that support authentication, business logic, data management, payments, and application workflows.",
      tags: ["Node.js", "Express", "REST APIs"],
    },
    {
      number: "IV",
      icon: "fa-solid fa-plug",
      title: "API & System Integration",
      description:
        "Connecting applications with APIs, payment platforms, authentication providers, cloud services, notifications, and other third-party systems.",
      tags: ["API Integration", "Payments", "Cloud Services"],
    },
    {
      number: "V",
      icon: "fa-solid fa-database",
      title: "Database & Architecture",
      description:
        "Designing structured data models and application architectures that are maintainable, scalable, and suited to the needs of each product.",
      tags: ["PostgreSQL", "MongoDB", "Architecture"],
    },
    {
      number: "VI",
      icon: "fa-solid fa-bug-slash",
      title: "Testing & Debugging",
      description:
        "Identifying and resolving technical issues through structured debugging, testing, and continuous improvements to application reliability.",
      tags: ["Debugging", "Testing", "Quality"],
    },
  ];

  return (
    <section className="whatido" id="services">
      <div className="whatido_inner">
        {/* Section heading */}
        <div className="whatido_heading">
          <div className="whatido_heading_meta">
            <span className="whatido_section_number">02</span>
            <span className="whatido_section_label">Services</span>
          </div>

          <div className="whatido_heading_content">
            <p className="whatido_eyebrow">HOW I CAN HELP</p>

            <h1 className="whatido_title">
              WHAT I
              <br />
              <span>DO?</span>
            </h1>
          </div>

          <p className="whatido_intro">
            I design and develop reliable digital products across web, mobile,
            and backend systems, combining thoughtful interfaces with solid
            engineering.
          </p>
        </div>

        {/* Services */}
        <div className="whatido_services">
          {services.map((service) => (
            <article className="whatido_service" key={service.number}>
              <div className="whatido_service_number">{service.number}</div>

              <div className="whatido_service_main">
                <div className="whatido_service_top">
                  <div className="whatido_icon">
                    <i className={service.icon} aria-hidden="true"></i>
                  </div>

                  <span className="whatido_service_label">SERVICE</span>
                </div>

                <h2>{service.title}</h2>

                <p className="whatido_service_description">
                  {service.description}
                </p>

                <div className="whatido_tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="whatido_service_arrow" aria-hidden="true">
                <ArrowUpRight size={22} strokeWidth={1.8} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Whatido;
