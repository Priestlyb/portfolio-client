import React, { useContext } from "react";
import dp from "./it-developer.gif";
import { Context } from "../../context/Context";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="nav_bar">
      <button
        className="navbar-btn btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvastop"
        aria-controls="offcanvasBottom"
        data-aos="fade-in"
        data-aos-delay="100"
        data-aos-once="false"
      >
        <i class="fa-solid fa-bars-staggered"></i>
      </button>

      <div
        className="offcanvas offcanvas-start offcanvascustom-width"
        tabIndex="-1"
        id="offcanvastop"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <div className="my-bg"></div>
          <img src={dp} alt="My Face" className="my-face" />
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body large">
          <div className="nav_bar_links">
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-0.5s animate__slower active"
              aria-current="page"
              href="#home"
            >
              <i className="fa-solid fa-house-chimney"></i> HOME
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-1s animate__slower"
              href="#about"
            >
              <i className="fa-regular fa-address-card"></i> ABOUT
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-2s animate__slower"
              href="#portfolios"
            >
              <i className="fa-solid fa-folder-tree"></i> PORTFOLIO
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
              href="#services"
            >
              <i className="fa-solid fa-sliders"></i> SERVICES
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
              href="/admin"
            >
              {user && "ADMIN"}
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
              href="#services"
              onClick={handleLogout}
            >
              {" "}
              {user && "LOGOUT"}
            </a>
          </div>

          <div className="wrapper">
            <div className="icon facebook">
              <a
                href="http://linkedin.com/in/priestly-bassey-486278175"
                className="social_icon"
                target="blank"
              >
                <span className="tooltip">Linkedin</span>
                <span>
                  <i className="animate__animated animate__slow animate__rotateIn animate__infinite fa-brands fa-linkedin-in"></i>
                </span>
              </a>
            </div>
            <div className="icon twitter">
              <a
                href="https://twitter.com/priestlythedon"
                className="social_icon"
                target="blank"
              >
                <span className="tooltip">Twitter</span>
                <span>
                  <i className="fab fa-twitter"></i>
                </span>
              </a>
            </div>
            <div className="icon github">
              <a
                href="https://github.com/Priestlyb"
                className="social_icon"
                target="blank"
              >
                <span className="tooltip">Github</span>
                <span>
                  <i className="animate__animated animate__slow animate__rotateIn animate__infinite fa-brands fa-github"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
