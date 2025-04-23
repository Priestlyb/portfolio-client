import { useState, useRef } from 'react';
import { axiosInstance } from '../../config';
import './Register.css';

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // default to hidden

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      }, {
        withCredentials: true
      });

      if (res.status === 200) {
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setError("Something went wrong. Please try again later.");
      } else {
        setError(err.response?.data || "An unexpected error occurred.");
      }
      setSuccess(false);
    }
  };

  return (
    <div className="register">
      <h1>Create an Account</h1>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Account created successfully. <a href="/admin">Login here</a>
        </div>
      )}

      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="registerInput"
          placeholder="Enter your Username..."
          ref={usernameRef}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="registerInput"
          placeholder="Enter your Email..."
          ref={emailRef}
        />

        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="registerInput"
            placeholder="Enter your Password..."
            ref={passwordRef}
          />
          <span
            className="password-toggle-button"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
        </div>

        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      {!success && (
        <p className="redirect-login">
          Already have an account? <a href="/admin">Login</a>
        </p>
      )}
    </div>
  );
}
