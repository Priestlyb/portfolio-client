import React from "react";
import "./whatido.css";
import { ArrowUpRight } from "lucide-react";

function Whatido() {
  const services = [
    {
      number: "I",
      icon: "fa-solid fa-palette",
      title: "UI/UX Design",
      description:
        "Designing intuitive digital interfaces with a strong focus on usability, visual hierarchy, consistency, and user experience.",
      tags: ["Interface Design", "Prototyping", "User Experience"],
    },
    {
      number: "II",
      icon: "fa-solid fa-code",
      title: "Web Design & Development",
      description:
        "Building modern, responsive websites that combine strong visual design with clean, maintainable, and scalable frontend code.",
      tags: ["Responsive Design", "React", "Frontend"],
    },
    {
      number: "III",
      icon: "fa-solid fa-money-bill-trend-up",
      title: "SEO Marketing",
      description:
        "Improving website visibility through technical optimization, structured content, metadata, performance improvements, and SEO best practices.",
      tags: ["Technical SEO", "Optimization", "Performance"],
    },
    {
      number: "IV",
      icon: "fa-solid fa-laptop-code",
      title: "Website Maintenance",
      description:
        "Keeping websites reliable, secure, and up to date through content updates, bug fixes, performance improvements, and technical support.",
      tags: ["Updates", "Security", "Support"],
    },
    {
      number: "V",
      icon: "fa-solid fa-bug-slash",
      title: "Testing & Debugging",
      description:
        "Finding and resolving issues through structured testing, debugging, and continuous improvements to application reliability.",
      tags: ["Testing", "Debugging", "Quality"],
    },
    {
      number: "VI",
      icon: "fa-solid fa-atom",
      title: "Backend Integration",
      description:
        "Connecting frontend applications to APIs, databases, authentication systems, payment services, and other backend technologies.",
      tags: ["REST APIs", "Integration", "Backend"],
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
            From ideas and interfaces to functional digital products, I bring
            together design, development, and technical problem-solving to
            create experiences that work.
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
