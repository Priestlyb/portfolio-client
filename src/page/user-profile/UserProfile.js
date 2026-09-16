import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Eye, EyeOff, ArrowUpRight, LockKeyhole } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";

function UserProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        console.error(
          "User ID is undefined. Make sure your route includes ':id'.",
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await axiosInstance.get(`/users/${id}`);

        setInputs(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);

        setMessage({
          type: "error",
          text: "Unable to load your profile.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const sendRequest = async () => {
    const payload = {
      email: inputs.email,
    };

    if (inputs.password && inputs.password.trim() !== "") {
      payload.password = inputs.password;
    }

    await axiosInstance.put(`/user/${id}`, payload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await sendRequest();

      setMessage({
        type: "success",
        text: "Your profile has been updated successfully.",
      });

      setTimeout(() => {
        navigate("/userProfile");
      }, 900);
    } catch (err) {
      console.error("Update failed:", err);

      setMessage({
        type: "error",
        text: "Unable to update your profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (message.text) {
      setMessage({
        type: "",
        text: "",
      });
    }
  };

  if (loading) {
    return (
      <main className="user_profile_page">
        <div className="user_profile_loading">
          <div className="user_profile_loading_line"></div>
          <span>LOADING PROFILE...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="user_profile_page">
      <div className="user_profile_inner">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="user_profile_header">
          <div className="user_profile_header_left">
            <div className="user_profile_marker">
              <span>USER</span>
              <span>01</span>
            </div>

            <div>
              <p className="user_profile_eyebrow">ACCOUNT MANAGEMENT</p>

              <h1 className="user_profile_title">
                USER
                <span>PROFILE.</span>
              </h1>
            </div>
          </div>

          <div className="user_profile_header_right">
            <span className="user_profile_status_dot"></span>

            <div>
              <span>ACCOUNT STATUS</span>
              <strong>ACTIVE</strong>
            </div>
          </div>
        </header>

        {/* =================================================
            PROFILE IDENTITY
        ================================================= */}

        <section className="user_profile_identity">
          <div className="user_profile_identity_number">
            <span>PROFILE</span>
            <strong>01</strong>
          </div>

          <div className="user_profile_identity_content">
            <span className="user_profile_identity_label">ACCOUNT HOLDER</span>

            <h2>{inputs.username || "User"}</h2>

            <p>
              Manage your account information and security settings from one
              place.
            </p>
          </div>

          <div className="user_profile_identity_mark">✦</div>
        </section>

        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <section className="user_profile_section">
          <div className="user_profile_section_header">
            <div>
              <span>01 — ACCOUNT</span>
              <h2>ACCOUNT INFORMATION</h2>
            </div>

            <p>Your current account details.</p>
          </div>

          <div className="user_profile_information">
            <div className="user_profile_information_item">
              <span>USERNAME</span>
              <strong>{inputs.username || "—"}</strong>
            </div>

            <div className="user_profile_information_item">
              <span>EMAIL ADDRESS</span>
              <strong>{inputs.email || "—"}</strong>
            </div>

            <div className="user_profile_information_item">
              <span>ACCOUNT</span>
              <strong className="user_profile_active">
                <i></i>
                ACTIVE
              </strong>
            </div>
          </div>
        </section>

        {/* =================================================
            EDIT PROFILE
        ================================================= */}

        <section className="user_profile_section user_profile_edit_section">
          <div className="user_profile_section_header">
            <div>
              <span>02 — EDIT</span>
              <h2>UPDATE PROFILE</h2>
            </div>

            <p>Change your email address or password.</p>
          </div>

          <form className="user_profile_form" onSubmit={handleSubmit}>
            {/* USERNAME */}

            <div className="user_profile_field">
              <div className="user_profile_field_number">01</div>

              <div className="user_profile_field_content">
                <label htmlFor="username">USERNAME</label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  disabled
                />

                <small>Your username cannot be changed.</small>
              </div>

              <span className="user_profile_locked">LOCKED</span>
            </div>

            {/* EMAIL */}

            <div className="user_profile_field">
              <div className="user_profile_field_number">02</div>

              <div className="user_profile_field_content">
                <label htmlFor="email">EMAIL ADDRESS</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

                <small>This email will be used for your account.</small>
              </div>
            </div>

            {/* PASSWORD */}

            <div className="user_profile_field user_profile_password_field">
              <div className="user_profile_field_number">03</div>

              <div className="user_profile_field_content">
                <label htmlFor="password">NEW PASSWORD</label>

                <div className="user_profile_password_wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    placeholder="Leave empty to keep current password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="user_profile_password_toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                <small>
                  Leave this field empty if you do not want to change your
                  password.
                </small>
              </div>

              <div className="user_profile_security_icon">
                <LockKeyhole size={17} />
              </div>
            </div>

            {/* FEEDBACK */}

            {message.text && (
              <div
                className={`user_profile_message ${
                  message.type === "success" ? "is-success" : "is-error"
                }`}
              >
                <span>{message.type === "success" ? "✓" : "!"}</span>

                <p>{message.text}</p>
              </div>
            )}

            {/* SUBMIT */}

            <div className="user_profile_submit_row">
              <div className="user_profile_submit_note">
                <span>SECURITY</span>
                <p>Your account information is kept private and secure.</p>
              </div>

              <button
                type="submit"
                className="user_profile_submit"
                disabled={saving}
              >
                <span>{saving ? "UPDATING..." : "UPDATE PROFILE"}</span>

                <span className="user_profile_submit_icon">
                  {saving ? "..." : <ArrowUpRight size={17} />}
                </span>
              </button>
            </div>
          </form>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="user_profile_footer">
          <span>PRIESTLY PATRICK BASSEY</span>

          <span className="user_profile_footer_mark">✦</span>

          <span>ACCOUNT / PROFILE</span>
        </footer>
      </div>
    </main>
  );
}

export default UserProfile;
