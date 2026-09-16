import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./PortfolioUpdate.css";

const PortfolioUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    project_location: "",
    project_role: "",
    project_img: "",
    project_description: "",
    view_link: "",
    github_link: "",
    technologies: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(`/portfolios/${id}`);

        const portfolio = res.data?.portfolio || res.data;

        setInputs({
          project_location: portfolio?.project_location || "",
          project_role: portfolio?.project_role || "",
          project_img: portfolio?.project_img || "",
          project_description: portfolio?.project_description || "",
          view_link: portfolio?.view_link || "",
          github_link: portfolio?.github_link || "",
          technologies: Array.isArray(portfolio?.technologies)
            ? portfolio.technologies.join(", ")
            : portfolio?.technologies || "",
        });
      } catch (err) {
        console.error("Portfolio Fetch Error:", err);
        setError("Unable to load this project.");
      } finally {
        setLoading(false);
      }
    };

    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess(false);
    }
  };

  const sendRequest = async () => {
    const technologyList = String(inputs.technologies || "")
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    return await axiosInstance.put(`/portfolios/${id}`, {
      project_location: String(inputs.project_location || ""),
      project_role: String(inputs.project_role || ""),
      project_img: String(inputs.project_img || ""),
      project_description: String(inputs.project_description || ""),
      view_link: String(inputs.view_link || ""),
      github_link: String(inputs.github_link || ""),
      technologies: technologyList,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      await sendRequest();

      setSuccess(true);

      setTimeout(() => {
        navigate("/admin");
      }, 900);
    } catch (err) {
      console.error("Portfolio Update Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update this project. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="portfolio_update_loading">
        <div className="portfolio_update_loading_inner">
          <div className="portfolio_update_loading_top">
            <span></span>
            <span></span>
          </div>

          <div className="portfolio_update_loading_title"></div>

          <div className="portfolio_update_loading_fields">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </main>
    );
  }

  if (error && !inputs.project_location) {
    return (
      <main className="portfolio_update_error">
        <div className="portfolio_update_error_inner">
          <span>ERROR / 404</span>

          <h1>
            Project
            <br />
            <em>unavailable.</em>
          </h1>

          <p>{error}</p>

          <a href="/admin">
            <span>←</span>
            Back to admin
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="portfolio_update_page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="portfolio_update_header">
        <div className="portfolio_update_header_top">
          <a href="/admin" className="portfolio_update_back">
            <span>←</span>
            <strong>BACK TO ADMIN</strong>
          </a>

          <div className="portfolio_update_status">
            <span></span>
            EDITING PROJECT
          </div>
        </div>

        <div className="portfolio_update_heading">
          <div className="portfolio_update_heading_number">
            <span>ADMIN</span>
            <strong>02</strong>
          </div>

          <div>
            <p>PORTFOLIO MANAGEMENT / EDIT</p>

            <h1>
              EDIT
              <span>PROJECT.</span>
            </h1>
          </div>
        </div>
      </header>

      {/* =====================================================
          PROJECT IDENTITY
      ===================================================== */}

      <section className="portfolio_update_identity">
        <div className="portfolio_update_identity_label">
          <span>CURRENT PROJECT</span>
          <strong>PROJECT / {String(id).slice(-6).toUpperCase()}</strong>
        </div>

        <div className="portfolio_update_identity_name">
          <span>EDITING</span>
          <h2>{inputs.project_location || "Untitled Project"}</h2>
        </div>

        <span className="portfolio_update_identity_mark">✦</span>
      </section>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form className="portfolio_update_form" onSubmit={handleSubmit}>
        <section className="portfolio_update_section">
          <div className="portfolio_update_section_header">
            <div>
              <span>01 — PROJECT</span>
              <h2>PROJECT INFORMATION</h2>
            </div>

            <p>Update the basic information displayed across your portfolio.</p>
          </div>

          <div className="portfolio_update_fields">
            <div className="portfolio_update_field">
              <span className="portfolio_update_field_number">01</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="project_location">PROJECT NAME</label>

                <input
                  id="project_location"
                  name="project_location"
                  type="text"
                  value={inputs.project_location}
                  onChange={handleChange}
                  placeholder="e.g. Ovena Delivery"
                  required
                />

                <small>The main title shown on your portfolio.</small>
              </div>
            </div>

            <div className="portfolio_update_field">
              <span className="portfolio_update_field_number">02</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="project_role">PROJECT ROLE</label>

                <input
                  id="project_role"
                  name="project_role"
                  type="text"
                  value={inputs.project_role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />

                <small>Your role or contribution to this project.</small>
              </div>
            </div>

            <div className="portfolio_update_field portfolio_update_field_full">
              <span className="portfolio_update_field_number">03</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="project_img">PROJECT IMAGE</label>

                <input
                  id="project_img"
                  name="project_img"
                  type="url"
                  value={inputs.project_img}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />

                <small>Paste the URL of the project preview image.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio_update_section portfolio_update_section_dark">
          <div className="portfolio_update_section_header">
            <div>
              <span>02 — CONTENT</span>
              <h2>PROJECT STORY</h2>
            </div>

            <p>Describe what the project is and what you contributed to it.</p>
          </div>

          <div className="portfolio_update_description">
            <span>04</span>

            <div>
              <label htmlFor="project_description">PROJECT DESCRIPTION</label>

              <textarea
                id="project_description"
                name="project_description"
                value={inputs.project_description}
                onChange={handleChange}
                placeholder="Tell the story behind this project..."
                rows="9"
                required
              />

              <small>
                Keep the description clear, specific, and focused on the
                project.
              </small>
            </div>
          </div>
        </section>

        <section className="portfolio_update_section">
          <div className="portfolio_update_section_header">
            <div>
              <span>03 — TECHNOLOGY</span>
              <h2>THE STACK.</h2>
            </div>

            <p>Add the technologies used to build this project.</p>
          </div>

          <div className="portfolio_update_fields">
            <div className="portfolio_update_field portfolio_update_field_full">
              <span className="portfolio_update_field_number">05</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="technologies">TECHNOLOGIES</label>

                <input
                  id="technologies"
                  name="technologies"
                  type="text"
                  value={inputs.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />

                <small>Separate each technology with a comma.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio_update_section portfolio_update_links_section">
          <div className="portfolio_update_section_header">
            <div>
              <span>04 — LINKS</span>
              <h2>PROJECT LINKS.</h2>
            </div>

            <p>Connect visitors directly to the project and source code.</p>
          </div>

          <div className="portfolio_update_fields">
            <div className="portfolio_update_field">
              <span className="portfolio_update_field_number">06</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="view_link">LIVE PROJECT</label>

                <input
                  id="view_link"
                  name="view_link"
                  type="url"
                  value={inputs.view_link}
                  onChange={handleChange}
                  placeholder="https://your-project.com"
                />

                <small>Link to the live website or application.</small>
              </div>
            </div>

            <div className="portfolio_update_field">
              <span className="portfolio_update_field_number">07</span>

              <div className="portfolio_update_field_content">
                <label htmlFor="github_link">SOURCE CODE</label>

                <input
                  id="github_link"
                  name="github_link"
                  type="url"
                  value={inputs.github_link}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />

                <small>Link to the project's GitHub repository.</small>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FEEDBACK + SAVE
        ===================================================== */}

        {(error || success) && (
          <div
            className={`portfolio_update_message ${
              success
                ? "portfolio_update_message_success"
                : "portfolio_update_message_error"
            }`}
          >
            <span>{success ? "✓" : "!"}</span>

            <div>
              <strong>{success ? "PROJECT UPDATED" : "UPDATE FAILED"}</strong>

              <p>
                {success
                  ? "Your portfolio project has been updated successfully."
                  : error}
              </p>
            </div>
          </div>
        )}

        <div className="portfolio_update_submit">
          <div className="portfolio_update_security">
            <span>✦</span>

            <div>
              <strong>PORTFOLIO DATABASE</strong>
              <p>Changes will be saved to your portfolio database.</p>
            </div>
          </div>

          <button
            type="submit"
            className="portfolio_update_save"
            disabled={saving}
          >
            <span>{saving ? "SAVING PROJECT..." : "SAVE CHANGES"}</span>

            <span className="portfolio_update_save_icon">
              {saving ? (
                <span className="portfolio_update_spinner"></span>
              ) : (
                "↗"
              )}
            </span>
          </button>
        </div>
      </form>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="portfolio_update_footer">
        <span>PRIESTLY PATRICK BASSEY</span>
        <span>ADMIN / EDIT PROJECT</span>
        <span>✦ 2026</span>
      </footer>
    </main>
  );
};

export default PortfolioUpdate;
