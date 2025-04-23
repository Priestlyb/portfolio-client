import { useState, useContext, useRef } from 'react';
import { Context } from "../../context/Context";
import "./Login.css";
import { axiosInstance } from '../../config';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

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

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setSuccess(true);
      setError("");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (err.response?.status === 400) {
        setError("Wrong credentials!");
      } else if (err.response?.status === 500) {
        setError("Something went wrong. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccess(false);
    }
  };

  return (
    <div className="login">
      <h1>Admin login</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Login successful.</div>}

      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your Email..."
          ref={emailRef}
        />

        <label>Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="password-input"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <span className="password-toggle-button" onClick={toggleShowPassword}>
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </span>
        </div>

        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? "Logging in..." : "Login"}
        </button>
      </form>

      <a href="/register" className="registerButton">Register</a>
    </div>
  );
}
