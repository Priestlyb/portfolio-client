import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { axiosInstance } from "../../config";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import "./add_project.css";

const AddProject = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    project_img: "",
    project_location: "",
    project_role: "",
    project_description: "",
    view_link: "",
    github_link: "",
    technologies: "",
  });

  const [saving, setSaving] = useState(false);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeFeedback = () => {
    setFeedback({
      isOpen: false,
      message: "",
      type: "success",
    });
  };

  const sendRequest = async () => {
    const technologyList = String(inputs.technologies || "")
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    return await axiosInstance.post("/portfolios", {
      project_img: String(inputs.project_img || ""),
      project_location: String(inputs.project_location || ""),
      project_role: String(inputs.project_role || ""),
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

      await sendRequest();

      setFeedback({
        isOpen: true,
        message: "Your new portfolio project has been created successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      console.error("Add Project Error:", err);

      setFeedback({
        isOpen: true,
        message:
          err.response?.data?.message ||
          "Unable to create this project. Please check your details and try again.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <main className="add_project_page">
        {/* Header */}
        <header className="add_project_header">
          <div className="add_project_header_top">
            <a href="/admin" className="add_project_back">
              <span>
                <ArrowLeft size={18} strokeWidth={2} />
              </span>
              <strong>BACK TO ADMIN</strong>
            </a>

            <div className="add_project_status">
              <span></span>
              NEW PROJECT
            </div>
          </div>

          <div className="add_project_heading">
            <div className="add_project_heading_number">
              <span>ADMIN</span>
              <strong>03</strong>
            </div>

            <div>
              <p>PORTFOLIO MANAGEMENT / CREATE</p>

              <h1>
                ADD
                <span>PROJECT.</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Project identity */}
        <section className="add_project_identity">
          <div className="add_project_identity_label">
            <span>NEW ENTRY</span>
            <strong>PROJECT / NEW</strong>
          </div>

          <div className="add_project_identity_name">
            <span>CREATING</span>
            <h2>{inputs.project_location || "Untitled Project"}</h2>
          </div>

          <span className="add_project_identity_mark">
            <Sparkles size={18} strokeWidth={2} />
          </span>
        </section>

        <form className="add_project_form" onSubmit={handleSubmit}>
          {/* Project information */}
          <section className="add_project_section">
            <div className="add_project_section_header">
              <div>
                <span>01 — PROJECT</span>
                <h2>PROJECT INFORMATION</h2>
              </div>

              <p>
                Add the core information that will identify and introduce this
                project across your portfolio.
              </p>
            </div>

            <div className="add_project_fields">
              <div className="add_project_field">
                <span className="add_project_field_number">01</span>

                <div className="add_project_field_content">
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

              <div className="add_project_field">
                <span className="add_project_field_number">02</span>

                <div className="add_project_field_content">
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

              <div className="add_project_field add_project_field_full">
                <span className="add_project_field_number">03</span>

                <div className="add_project_field_content">
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

          {/* Project story */}
          <section className="add_project_section add_project_section_dark">
            <div className="add_project_section_header">
              <div>
                <span>02 — CONTENT</span>
                <h2>PROJECT STORY</h2>
              </div>

              <p>
                Explain what the project is, what problem it solves, and what
                you contributed to the experience.
              </p>
            </div>

            <div className="add_project_description">
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

          {/* Technologies */}
          <section className="add_project_section">
            <div className="add_project_section_header">
              <div>
                <span>03 — TECHNOLOGY</span>
                <h2>THE STACK.</h2>
              </div>

              <p>
                Document the technologies, frameworks, and tools used to build
                the project.
              </p>
            </div>

            <div className="add_project_fields">
              <div className="add_project_field add_project_field_full">
                <span className="add_project_field_number">05</span>

                <div className="add_project_field_content">
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

          {/* Project links */}
          <section className="add_project_section add_project_links_section">
            <div className="add_project_section_header">
              <div>
                <span>04 — LINKS</span>
                <h2>PROJECT LINKS.</h2>
              </div>

              <p>
                Give visitors direct access to the live project and source code.
              </p>
            </div>

            <div className="add_project_fields">
              <div className="add_project_field">
                <span className="add_project_field_number">06</span>

                <div className="add_project_field_content">
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

              <div className="add_project_field">
                <span className="add_project_field_number">07</span>

                <div className="add_project_field_content">
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

          {/* Submit */}
          <div className="add_project_submit">
            <div className="add_project_security">
              <span>
                <Sparkles size={16} strokeWidth={2} />
              </span>

              <div>
                <strong>PORTFOLIO DATABASE</strong>
                <p>This project will be added to your portfolio database.</p>
              </div>
            </div>

            <button
              type="submit"
              className="add_project_save"
              disabled={saving}
            >
              <span>{saving ? "CREATING PROJECT..." : "CREATE PROJECT"}</span>

              <span className="add_project_save_icon">
                {saving ? (
                  <span className="add_project_spinner"></span>
                ) : (
                  <ArrowUpRight size={18} strokeWidth={2} />
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="add_project_footer">
          <span>PRIESTLY PATRICK BASSEY</span>
          <span>ADMIN / ADD PROJECT</span>
          <span>
            <Sparkles size={15} strokeWidth={2} />
            2026
          </span>
        </footer>
      </main>

      <FeedbackModal
        isOpen={feedback.isOpen}
        message={feedback.message}
        type={feedback.type}
        onClose={closeFeedback}
      />
    </>
  );
};

export default AddProject;
