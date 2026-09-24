import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Check,
  Plus,
  ArrowUpRight,
  X,
  Sparkles,
} from "lucide-react";
import "../../constants/styles/admin.css";
import { axiosInstance } from "../../config";

export default function EditExperience() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    company: "",
    location: "",
    period: "",
    type: "",
    order: "",
    duties: [""],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch experience
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(`/experiences/${id}`, {
          withCredentials: true,
        });

        const experience = res.data?.experience;

        if (!experience) {
          throw new Error("Experience not found");
        }

        setFormData({
          logo: experience.logo || "",
          title: experience.title || "",
          company: experience.company || "",
          location: experience.location || "",
          period: experience.period || "",
          type: experience.type || "",
          order: experience.order ?? "",
          duties:
            Array.isArray(experience.duties) && experience.duties.length > 0
              ? experience.duties
              : [""],
        });
      } catch (err) {
        console.error("Failed to fetch experience:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load this experience record.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    } else {
      setLoading(false);
      setError("No experience ID was provided.");
    }
  }, [id]);

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle duty changes
  const handleDutyChange = (index, value) => {
    setFormData((prev) => {
      const updatedDuties = [...prev.duties];
      updatedDuties[index] = value;

      return {
        ...prev,
        duties: updatedDuties,
      };
    });
  };

  // Add duty
  const addDuty = () => {
    setFormData((prev) => ({
      ...prev,
      duties: [...prev.duties, ""],
    }));
  };

  // Remove duty
  const removeDuty = (index) => {
    setFormData((prev) => {
      const updatedDuties = prev.duties.filter(
        (_, dutyIndex) => dutyIndex !== index,
      );

      return {
        ...prev,
        duties: updatedDuties.length > 0 ? updatedDuties : [""],
      };
    });
  };

  // Update experience
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.logo.trim() ||
      !formData.title.trim() ||
      !formData.company.trim() ||
      !formData.location.trim() ||
      !formData.period.trim() ||
      !formData.type.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const cleanedDuties = formData.duties
      .map((duty) => duty.trim())
      .filter(Boolean);

    try {
      setSaving(true);

      await axiosInstance.put(
        `/experiences/${id}`,
        {
          logo: formData.logo.trim(),
          title: formData.title.trim(),
          company: formData.company.trim(),
          location: formData.location.trim(),
          period: formData.period.trim(),
          type: formData.type.trim(),
          duties: cleanedDuties,
          order: Number(formData.order) || 0,
        },
        {
          withCredentials: true,
        },
      );

      setSuccess("Experience updated successfully.");

      setTimeout(() => {
        navigate("/admin");
      }, 700);
    } catch (err) {
      console.error("Failed to update experience:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while updating the experience.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="admin_page">
        <header className="admin_header">
          <div className="admin_header_left">
            <div className="admin_section_marker">
              <span>ADMIN</span>
              <span>02</span>
            </div>

            <div>
              <p className="admin_eyebrow">EXPERIENCE MANAGEMENT</p>

              <h1 className="admin_title">
                EDIT
                <span>EXPERIENCE.</span>
              </h1>
            </div>
          </div>
        </header>

        <section className="admin_projects">
          <div className="admin_loading">
            <div className="admin_loading_line"></div>
            <span>LOADING EXPERIENCE RECORD...</span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin_page">
      {/* HEADER */}
      <header className="admin_header">
        <div className="admin_header_left">
          <div className="admin_section_marker">
            <span>ADMIN</span>
            <span>02</span>
          </div>

          <div>
            <p className="admin_eyebrow">EXPERIENCE MANAGEMENT</p>

            <h1 className="admin_title">
              EDIT
              <span>EXPERIENCE.</span>
            </h1>
          </div>
        </div>
      </header>

      {/* FORM HEADER */}
      <section className="admin_projects_header">
        <div>
          <p>02 — EXPERIENCE DATABASE</p>
          <h2>EDIT RECORD</h2>
        </div>

        <span>UPDATE RECORD</span>
      </section>

      {/* FORM */}
      <section className="admin_projects">
        {error && !formData.title ? (
          <div className="admin_state admin_empty">
            <span className="admin_state_number">
              <AlertCircle size={20} strokeWidth={2} />
            </span>

            <div>
              <h3>Unable to load experience.</h3>

              <p>{error}</p>

              <button
                type="button"
                className="admin_retry"
                onClick={() => navigate("/admin")}
              >
                BACK TO ADMIN <ArrowUpRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        ) : (
          <form className="admin_experience_form" onSubmit={handleSubmit}>
            {/* ERROR */}
            {error && (
              <div className="admin_form_message admin_form_error">
                <span>
                  <AlertCircle size={18} strokeWidth={2} />
                </span>
                <p>{error}</p>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="admin_form_message admin_form_success">
                <span>
                  <Check size={18} strokeWidth={2} />
                </span>
                <p>{success}</p>
              </div>
            )}

            {/* POSITION DETAILS */}
            <div className="admin_form_section">
              <div className="admin_form_section_header">
                <span>01</span>

                <div>
                  <p>RECORD INFORMATION</p>
                  <h3>POSITION DETAILS</h3>
                </div>
              </div>

              <div className="admin_form_grid">
                {/* Logo */}
                <div className="admin_form_group admin_form_full">
                  <label htmlFor="logo">
                    COMPANY LOGO URL <span>*</span>
                  </label>

                  <input
                    id="logo"
                    name="logo"
                    type="text"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    autoComplete="off"
                  />

                  <small>Enter the public URL of the company logo.</small>
                </div>

                {/* Job title */}
                <div className="admin_form_group">
                  <label htmlFor="title">
                    JOB TITLE <span>*</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Frontend Developer"
                  />
                </div>

                {/* Company */}
                <div className="admin_form_group">
                  <label htmlFor="company">
                    COMPANY <span>*</span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Ovena Technologies"
                  />
                </div>

                {/* Location */}
                <div className="admin_form_group">
                  <label htmlFor="location">
                    LOCATION <span>*</span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Remote"
                  />
                </div>

                {/* Period */}
                <div className="admin_form_group">
                  <label htmlFor="period">
                    PERIOD <span>*</span>
                  </label>

                  <input
                    id="period"
                    name="period"
                    type="text"
                    value={formData.period}
                    onChange={handleChange}
                    placeholder="2025 — Current"
                  />
                </div>

                {/* Type */}
                <div className="admin_form_group">
                  <label htmlFor="type">
                    EMPLOYMENT TYPE <span>*</span>
                  </label>

                  <input
                    id="type"
                    name="type"
                    type="text"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Full Time"
                  />
                </div>

                {/* Order */}
                <div className="admin_form_group">
                  <label htmlFor="order">DISPLAY ORDER</label>

                  <input
                    id="order"
                    name="order"
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={handleChange}
                    placeholder="1"
                  />

                  <small>Lower numbers appear first.</small>
                </div>
              </div>
            </div>

            {/* DUTIES */}
            <div className="admin_form_section">
              <div className="admin_form_section_header">
                <span>02</span>

                <div>
                  <p>ROLE DESCRIPTION</p>
                  <h3>KEY CONTRIBUTIONS</h3>
                </div>
              </div>

              <div className="admin_duties">
                {formData.duties.map((duty, index) => (
                  <div className="admin_duty_row" key={index}>
                    <div className="admin_duty_number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <input
                      type="text"
                      value={duty}
                      onChange={(e) => handleDutyChange(index, e.target.value)}
                      placeholder="Describe a key contribution..."
                    />

                    {formData.duties.length > 1 && (
                      <button
                        type="button"
                        className="admin_duty_remove"
                        onClick={() => removeDuty(index)}
                        aria-label={`Remove duty ${index + 1}`}
                      >
                        <X size={18} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="admin_add_duty"
                  onClick={addDuty}
                >
                  <span>
                    <Plus size={18} strokeWidth={2} />
                  </span>

                  <span>ADD CONTRIBUTION</span>

                  <span>
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="admin_form_actions">
              <button
                type="button"
                className="admin_form_cancel"
                onClick={() => navigate("/admin")}
                disabled={saving}
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="admin_form_submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="admin_submit_spinner"></span>
                    <span>UPDATING...</span>
                  </>
                ) : (
                  <>
                    <span>UPDATE EXPERIENCE</span>
                    <span>
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="admin_footer">
        <span>PRIESTLY PATRICK BASSEY</span>
        <span>ADMIN / EXPERIENCE</span>
        <span>
          <Sparkles size={15} strokeWidth={2} />
          2026
        </span>
      </footer>
    </main>
  );
}
