import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { Eye, EyeOff } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';

function UserProfile () {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        console.error("User ID is undefined. Make sure your route includes ':id'.");
        return;
      }

      try {
        const res = await axiosInstance.get(`/user/${id}`);
        setInputs(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
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

    try {
      await axiosInstance.put(`/user/${id}`, payload);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate(`/userProfile`));
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="UserProfileWrapper">
      <h2>User Profile</h2>

      {/* Display Section */}
      <div className="UserProfileDisplay">
        <p><strong>Username:</strong> {inputs.username}</p>
        <p><strong>Email:</strong> {inputs.email}</p>
      </div>

      {/* Edit Form */}
      <form className="UserProfileForm" onSubmit={handleSubmit}>
        <h3>Edit Profile</h3>

        <div className="form-group">
          <label>Username (cannot be changed)</label>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group password-group">
          <label>New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
