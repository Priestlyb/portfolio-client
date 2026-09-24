import { useState, useContext, useRef } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Context } from "../../context/Context";
import "./Login.css";
import { axiosInstance } from "../../config";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    setError("");
    setSuccess(false);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      setSuccess(true);
      setError("");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });

      if (err.response?.status === 400) {
        setError("Wrong credentials.");
      } else if (err.response?.status === 500) {
        setError("Something went wrong. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }

      setSuccess(false);
    }
  };

  return (
    <main className="login_page">
      <div className="login_background_shape login_background_shape_one"></div>
      <div className="login_background_shape login_background_shape_two"></div>

      <div className="login_page_inner">
        <header className="login_header">
          <a href="/" className="login_brand">
            <span className="login_brand_mark">
              <Sparkles size={18} strokeWidth={2} />
            </span>

            <span>PRIESTLY PATRICK BASSEY</span>
          </a>

          <div className="login_header_meta">
            <span className="login_header_dot"></span>
            <span>SECURE ACCESS</span>
          </div>
        </header>

        <section className="login_content">
          <div className="login_intro">
            <div className="login_marker">
              <span>ADMIN</span>
              <strong>01</strong>
            </div>

            <div>
              <p className="login_eyebrow">ACCOUNT ACCESS</p>

              <h1 className="login_title">
                WELCOME
                <span>BACK.</span>
              </h1>

              <p className="login_description">
                Sign in to access your account and manage your portfolio
                workspace.
              </p>
            </div>
          </div>

          <div className="login_form_area">
            <div className="login_form_header">
              <div>
                <span>01 — AUTHENTICATION</span>
                <h2>ADMIN LOGIN</h2>
              </div>

              <span className="login_form_number">01 / 02</span>
            </div>

            {error && (
              <div className="login_message login_message_error">
                <span className="login_message_icon">
                  <AlertCircle size={18} strokeWidth={2} />
                </span>

                <div>
                  <strong>ACCESS DENIED</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="login_message login_message_success">
                <span className="login_message_icon">
                  <Check size={18} strokeWidth={2} />
                </span>

                <div>
                  <strong>LOGIN SUCCESSFUL</strong>
                  <p>Authentication completed successfully.</p>
                </div>
              </div>
            )}

            <form className="login_form" onSubmit={handleSubmit}>
              <div className="login_field">
                <div className="login_field_number">01</div>

                <div className="login_field_content">
                  <label htmlFor="login-email">EMAIL ADDRESS</label>

                  <input
                    id="login-email"
                    type="email"
                    className="login_input"
                    placeholder="Enter your email address"
                    ref={emailRef}
                    autoComplete="email"
                    required
                  />

                  <small>
                    Use the email address associated with your account.
                  </small>
                </div>
              </div>

              <div className="login_field">
                <div className="login_field_number">02</div>

                <div className="login_field_content">
                  <label htmlFor="login-password">PASSWORD</label>

                  <div className="login_password_wrapper">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      className="login_input login_password_input"
                      placeholder="Enter your password"
                      ref={passwordRef}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="login_password_toggle"
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

                  <small>
                    Your password is securely transmitted during login.
                  </small>
                </div>
              </div>

              <div className="login_form_footer">
                <div className="login_security_note">
                  <span className="login_security_icon">
                    <Sparkles size={16} strokeWidth={2} />
                  </span>

                  <div>
                    <span>SECURITY</span>
                    <p>Private and secure account access.</p>
                  </div>
                </div>

                <button
                  className="login_button"
                  type="submit"
                  disabled={isFetching}
                >
                  <span>{isFetching ? "AUTHENTICATING..." : "SIGN IN"}</span>

                  <span className="login_button_icon">
                    {isFetching ? (
                      <span className="login_spinner"></span>
                    ) : (
                      <ArrowUpRight size={20} strokeWidth={2} />
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="login_footer">
          <div>
            <span>PRIESTLY PATRICK BASSEY</span>

            <span className="login_footer_mark">
              <Sparkles size={14} strokeWidth={2} />
            </span>

            <span>2026</span>
          </div>

          <a href="/register" className="login_register_link">
            <span>NEW HERE?</span>

            <strong>
              CREATE ACCOUNT <ArrowUpRight size={16} strokeWidth={2} />
            </strong>
          </a>
        </footer>
      </div>
    </main>
  );
}
