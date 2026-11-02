
import { useEffect, useState } from "react";
import {
  Save,
  RefreshCw,
  UserRound,
  FileText,
  Briefcase,
  Globe,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { axiosInstance } from "../../config";
import "./ProfileManagement.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",

  greeting: "Hi there, I am",
  roles: [
    "UI/UX Designer",
    "Frontend Developer",
    "React Native Developer",
    "Full-Stack Software Engineer",
  ],
  heroDescription: "",

  cv: {
    url: "",
    fileName: "Priestly's Curriculum Vitae",
  },

  about: {
    sectionNumber: "01",
    sectionLabel: "Introduction",
    heading: "ABOUT ME",
    paragraphs: [],
  },

  profileImage: {
    url: "",
    publicId: "",
  },

  socialLinks: {
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    website: "",
  },
};

function ProfileManagement() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileExists, setProfileExists] = useState(false);

  // =========================================
  // FETCH PROFILE
  // =========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axiosInstance.get("/profile/admin", {
        withCredentials: true,
      });

      const profile = response.data?.data;

      if (!profile) {
        setProfileExists(false);
        setForm(initialForm);
        return;
      }

      setProfileExists(true);

      setForm({
        ...initialForm,
        ...profile,

        roles: Array.isArray(profile.roles)
          ? profile.roles
          : initialForm.roles,

        cv: {
          ...initialForm.cv,
          ...(profile.cv || {}),
        },

        about: {
          ...initialForm.about,
          ...(profile.about || {}),
          paragraphs: Array.isArray(profile.about?.paragraphs)
            ? profile.about.paragraphs
            : [],
        },

        profileImage: {
          ...initialForm.profileImage,
          ...(profile.profileImage || {}),
        },

        socialLinks: {
          ...initialForm.socialLinks,
          ...(profile.socialLinks || {}),
        },
      });
    } catch (err) {
      if (err.response?.status === 404) {
        // No profile exists yet. Allow the admin to create one.
        setProfileExists(false);
        setForm(initialForm);
      } else {
        console.error("Failed to fetch profile:", err);

        setError(
          err.response?.data?.message ||
            "Unable to retrieve profile information.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================================
  // FORM HANDLERS
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setForm((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  // =========================================
  // SAVE PROFILE
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const fullName = `${form.firstName} ${form.lastName}`.trim();

      const payload = {
        ...form,
        fullName,

        roles: form.roles
          .map((role) => role.trim())
          .filter(Boolean),

        about: {
          ...form.about,
          paragraphs: form.about.paragraphs
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        },
      };

      const response = await axiosInstance.put("/profile", payload, {
        withCredentials: true,
      });

      if (response.data?.success) {
        setProfileExists(true);

        if (response.data.data) {
          setForm((previous) => ({
            ...previous,
            ...response.data.data,
            cv: {
              ...previous.cv,
              ...(response.data.data.cv || {}),
            },
            about: {
              ...previous.about,
              ...(response.data.data.about || {}),
            },
            profileImage: {
              ...previous.profileImage,
              ...(response.data.data.profileImage || {}),
            },
            socialLinks: {
              ...previous.socialLinks,
              ...(response.data.data.socialLinks || {}),
            },
          }));
        }

        setSuccess(
          response.data.message || "Profile saved successfully.",
        );
      }
    } catch (err) {
      console.error("Failed to save profile:", err);

      const validationErrors = err.response?.data?.errors;

      setError(
        Array.isArray(validationErrors)
          ? validationErrors.join(", ")
          : err.response?.data?.message ||
              "Unable to save profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // RENDER
  // =========================================

  if (loading) {
    return (
      <section className="profile_management" id="profile">
        <div className="profile_management_loading">
          <RefreshCw size={20} className="profile_spin" />
          <span>LOADING PROFILE INFORMATION...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="profile_management" id="profile">
      {/* SECTION HEADER */}

      <div className="profile_management_header">
        <div>
          <p className="profile_management_eyebrow">
            02 — PERSONAL INFORMATION
          </p>

          <h2>PROFILE MANAGEMENT</h2>

          <p className="profile_management_description">
            Manage the information displayed across your portfolio website.
          </p>
        </div>

        <button
          type="button"
          className="profile_refresh_btn"
          onClick={fetchProfile}
          disabled={saving}
          title="Refresh profile"
        >
          <RefreshCw size={16} />
          <span>REFRESH</span>
        </button>
      </div>

      {/* STATUS MESSAGES */}

      {error && (
        <div className="profile_message profile_message_error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="profile_message profile_message_success">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      {!profileExists && (
        <div className="profile_message profile_message_info">
          <AlertCircle size={18} />
          <span>
            No profile has been created yet. Complete the fields below to
            create your portfolio profile.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* PERSONAL INFORMATION */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <UserRound size={19} />
            </span>

            <div>
              <h3>PERSONAL INFORMATION</h3>
              <p>Your basic profile details.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            <div className="profile_field">
              <label htmlFor="firstName">FIRST NAME</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Priestly"
                required
              />
            </div>

            <div className="profile_field">
              <label htmlFor="lastName">LAST NAME</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Bassey"
                required
              />
            </div>

            <div className="profile_field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange}
                placeholder="hello@example.com"
              />
            </div>

            <div className="profile_field">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                id="phone"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                placeholder="+234..."
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="location">LOCATION</label>
              <input
                id="location"
                name="location"
                value={form.location || ""}
                onChange={handleChange}
                placeholder="Nigeria"
              />
            </div>
          </div>
        </div>

        {/* HERO SECTION */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <Briefcase size={19} />
            </span>

            <div>
              <h3>HERO / HEADER SECTION</h3>
              <p>The first information visitors see on your website.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            <div className="profile_field profile_field_full">
              <label htmlFor="greeting">GREETING</label>
              <input
                id="greeting"
                name="greeting"
                value={form.greeting}
                onChange={handleChange}
                placeholder="Hi there, I am"
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="roles">PROFESSIONAL ROLES</label>
              <textarea
                id="roles"
                rows={4}
                value={form.roles.join("\n")}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    roles: event.target.value.split("\n"),
                  }))
                }
                placeholder={
                  "UI/UX Designer\nFrontend Developer\nReact Native Developer"
                }
              />
              <small>Enter one role per line. These power your typing animation.</small>
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="heroDescription">HERO DESCRIPTION</label>
              <textarea
                id="heroDescription"
                name="heroDescription"
                rows={5}
                value={form.heroDescription || ""}
                onChange={handleChange}
                placeholder="Write your introduction..."
              />
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <FileText size={19} />
            </span>

            <div>
              <h3>ABOUT SECTION</h3>
              <p>Manage your About Me content.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            <div className="profile_field">
              <label htmlFor="sectionNumber">SECTION NUMBER</label>
              <input
                id="sectionNumber"
                value={form.about.sectionNumber || ""}
                onChange={(event) =>
                  handleNestedChange(
                    "about",
                    "sectionNumber",
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="profile_field">
              <label htmlFor="sectionLabel">SECTION LABEL</label>
              <input
                id="sectionLabel"
                value={form.about.sectionLabel || ""}
                onChange={(event) =>
                  handleNestedChange(
                    "about",
                    "sectionLabel",
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="aboutHeading">HEADING</label>
              <input
                id="aboutHeading"
                value={form.about.heading || ""}
                onChange={(event) =>
                  handleNestedChange(
                    "about",
                    "heading",
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="aboutParagraphs">ABOUT PARAGRAPHS</label>
              <textarea
                id="aboutParagraphs"
                rows={10}
                value={(form.about.paragraphs || []).join("\n\n")}
                onChange={(event) =>
                  handleNestedChange(
                    "about",
                    "paragraphs",
                    event.target.value.split(/\n\s*\n/),
                  )
                }
                placeholder="Write each paragraph separated by a blank line..."
              />
              <small>Separate each paragraph with a blank line.</small>
            </div>
          </div>
        </div>

        {/* CV SECTION */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <FileText size={19} />
            </span>

            <div>
              <h3>CURRICULUM VITAE</h3>
              <p>Manage the CV download link on your website.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            <div className="profile_field profile_field_full">
              <label htmlFor="cvUrl">CV FILE URL</label>
              <input
                id="cvUrl"
                type="url"
                value={form.cv.url || ""}
                onChange={(event) =>
                  handleNestedChange("cv", "url", event.target.value)
                }
                placeholder="https://your-storage-url/cv.pdf"
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="cvFileName">DOWNLOAD FILE NAME</label>
              <input
                id="cvFileName"
                value={form.cv.fileName || ""}
                onChange={(event) =>
                  handleNestedChange("cv", "fileName", event.target.value)
                }
                placeholder="Priestly's Curriculum Vitae"
              />
            </div>
          </div>
        </div>

        {/* PROFILE IMAGE */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <UserRound size={19} />
            </span>

            <div>
              <h3>PROFILE IMAGE</h3>
              <p>Manage your profile image URL and storage reference.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            <div className="profile_field profile_field_full">
              <label htmlFor="profileImageUrl">IMAGE URL</label>
              <input
                id="profileImageUrl"
                type="url"
                value={form.profileImage.url || ""}
                onChange={(event) =>
                  handleNestedChange(
                    "profileImage",
                    "url",
                    event.target.value,
                  )
                }
                placeholder="https://your-storage-url/profile.jpg"
              />
            </div>

            <div className="profile_field profile_field_full">
              <label htmlFor="profileImagePublicId">STORAGE PUBLIC ID</label>
              <input
                id="profileImagePublicId"
                value={form.profileImage.publicId || ""}
                onChange={(event) =>
                  handleNestedChange(
                    "profileImage",
                    "publicId",
                    event.target.value,
                  )
                }
                placeholder="Optional storage identifier"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL LINKS */}

        <div className="profile_form_section">
          <div className="profile_form_section_header">
            <span className="profile_form_icon">
              <Globe size={19} />
            </span>

            <div>
              <h3>SOCIAL LINKS</h3>
              <p>Manage your external profile links.</p>
            </div>
          </div>

          <div className="profile_form_grid">
            {Object.entries(form.socialLinks).map(([platform, value]) => (
              <div className="profile_field" key={platform}>
                <label htmlFor={`social-${platform}`}>
                  {platform.toUpperCase()}
                </label>

                <input
                  id={`social-${platform}`}
                  type="url"
                  value={value || ""}
                  onChange={(event) =>
                    handleNestedChange(
                      "socialLinks",
                      platform,
                      event.target.value,
                    )
                  }
                  placeholder={`https://${platform}.com/your-profile`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SAVE ACTION */}

        <div className="profile_form_actions">
          <span>
            {profileExists
              ? "YOUR PROFILE INFORMATION"
              : "CREATE YOUR PORTFOLIO PROFILE"}
          </span>

          <button
            type="submit"
            className="profile_save_btn"
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw size={17} className="profile_spin" />
                <span>SAVING...</span>
              </>
            ) : (
              <>
                <Save size={17} />
                <span>{profileExists ? "SAVE CHANGES" : "CREATE PROFILE"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfileManagement;
