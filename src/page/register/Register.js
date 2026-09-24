import { useState, useRef } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { axiosInstance } from "../../config";
import "./Register.css";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    setError("");
    setSuccess(false);

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axiosInstance.post(
        "/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      console.error("Registration failed:", err);

      if (err.response?.status === 500) {
        setError("Something went wrong. Please try again later.");
      } else if (typeof err.response?.data === "string") {
        setError(err.response.data);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }

      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register_page">
      <div className="register_background_shape register_background_shape_one"></div>
      <div className="register_background_shape register_background_shape_two"></div>

      <div className="register_page_inner">
        <header className="register_header">
          <a href="/" className="register_brand">
            <span className="register_brand_mark">
              <Sparkles size={18} strokeWidth={2} />
            </span>

            <span>PRIESTLY PATRICK BASSEY</span>
          </a>

          <div className="register_header_meta">
            <span className="register_header_dot"></span>
            <span>ACCOUNT CREATION</span>
          </div>
        </header>

        <section className="register_content">
          <div className="register_intro">
            <div className="register_marker">
              <span>USER</span>
              <strong>01</strong>
            </div>

            <div>
              <p className="register_eyebrow">GET STARTED</p>

              <h1 className="register_title">
                CREATE
                <span>ACCOUNT.</span>
              </h1>

              <p className="register_description">
                Create your account to access the portfolio workspace and manage
                your profile securely.
              </p>
            </div>
          </div>

          <div className="register_form_area">
            <div className="register_form_header">
              <div>
                <span>01 — REGISTRATION</span>
                <h2>NEW ACCOUNT</h2>
              </div>

              <span className="register_form_number">01 / 03</span>
            </div>

            {error && (
              <div className="register_message register_message_error">
                <span className="register_message_icon">
                  <AlertCircle size={18} strokeWidth={2} />
                </span>

                <div>
                  <strong>REGISTRATION FAILED</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="register_message register_message_success">
                <span className="register_message_icon">
                  <Check size={18} strokeWidth={2} />
                </span>

                <div>
                  <strong>ACCOUNT CREATED</strong>
                  <p>Your account has been created successfully.</p>
                </div>
              </div>
            )}

            <form className="register_form" onSubmit={handleSubmit}>
              <div className="register_field">
                <div className="register_field_number">01</div>

                <div className="register_field_content">
                  <label htmlFor="register-username">USERNAME</label>

                  <input
                    id="register-username"
                    type="text"
                    name="username"
                    className="register_input"
                    placeholder="Choose a username"
                    ref={usernameRef}
                    autoComplete="username"
                    required
                  />

                  <small>This name will be associated with your account.</small>
                </div>
              </div>

              <div className="register_field">
                <div className="register_field_number">02</div>

                <div className="register_field_content">
                  <label htmlFor="register-email">EMAIL ADDRESS</label>

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    className="register_input"
                    placeholder="Enter your email address"
                    ref={emailRef}
                    autoComplete="email"
                    required
                  />

                  <small>Use an email address you have access to.</small>
                </div>
              </div>

              <div className="register_field">
                <div className="register_field_number">03</div>

                <div className="register_field_content">
                  <label htmlFor="register-password">PASSWORD</label>

                  <div className="register_password_wrapper">
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="register_input register_password_input"
                      placeholder="Create a secure password"
                      ref={passwordRef}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="register_password_toggle"
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={18} strokeWidth={2} />
                      ) : (
                        <Eye size={18} strokeWidth={2} />
                      )}
                    </button>
                  </div>

                  <small>Choose a password that is difficult to guess.</small>
                </div>
              </div>

              <div className="register_form_footer">
                <div className="register_security_note">
                  <span className="register_security_icon">
                    <Sparkles size={16} strokeWidth={2} />
                  </span>

                  <div>
                    <span>SECURITY</span>
                    <p>Your account information is kept private.</p>
                  </div>
                </div>

                <button
                  className="register_submit"
                  type="submit"
                  disabled={isSubmitting || success}
                >
                  <span>{isSubmitting ? "CREATING..." : "CREATE ACCOUNT"}</span>

                  <span className="register_submit_icon">
                    {isSubmitting ? (
                      <span className="register_spinner"></span>
                    ) : (
                      <ArrowUpRight size={20} strokeWidth={2} />
                    )}
                  </span>
                </button>
              </div>
            </form>

            {success && (
              <a href="/admin" className="register_success_link">
                <span>ACCOUNT READY</span>

                <strong>
                  GO TO LOGIN <ArrowUpRight size={16} strokeWidth={2} />
                </strong>
              </a>
            )}
          </div>
        </section>

        <footer className="register_footer">
          <div>
            <span>PRIESTLY PATRICK BASSEY</span>

            <span className="register_footer_mark">
              <Sparkles size={14} strokeWidth={2} />
            </span>

            <span>2026</span>
          </div>

          {!success && (
            <a href="/admin" className="register_login_link">
              <span>ALREADY REGISTERED?</span>

              <strong>
                SIGN IN <ArrowUpRight size={16} strokeWidth={2} />
              </strong>
            </a>
          )}
        </footer>
      </div>
    </main>
  );
}
