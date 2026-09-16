import React, { useContext } from "react";
import dp from "./it-developer.gif";
import { Context } from "../../context/Context";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const closeMenu = () => {
    const offcanvasElement = document.getElementById("offcanvastop");

    if (offcanvasElement && window.bootstrap) {
      const instance =
        window.bootstrap.Offcanvas.getInstance(offcanvasElement);

      instance?.hide();
    }
  };

  return (
    <div className="nav_bar">
      {/* Menu Trigger */}
      <button
        className="navbar-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvastop"
        aria-controls="offcanvastop"
        aria-label="Open navigation menu"
      >
        <span className="navbar-btn_icon">
          <i className="fa-solid fa-bars-staggered"></i>
        </span>
        <span className="navbar-btn_text">MENU</span>
      </button>

      {/* Offcanvas Navigation */}
      <div
        className="offcanvas offcanvas-start offcanvascustom-width"
        tabIndex="-1"
        id="offcanvastop"
        aria-labelledby="offcanvasTopLabel"
      >
        {/* Header */}
        <div className="offcanvas-header navbar_offcanvas_header">
          <div className="navbar_header_shape navbar_header_shape_one"></div>
          <div className="navbar_header_shape navbar_header_shape_two"></div>

          <div className="navbar_profile">
            <div className="navbar_profile_image">
              <img src={dp} alt="Priestly Patrick Bassey" />
            </div>

            <div className="navbar_profile_text">
              <strong>Priestly Bassey</strong>
            </div>
          </div>

          <button
            type="button"
            className="navbar_close"
            data-bs-dismiss="offcanvas"
            aria-label="Close navigation"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Body */}
        <div className="offcanvas-body navbar_offcanvas_body">
          <div className="navbar_navigation">
            <p className="navbar_navigation_label">NAVIGATION</p>

            <nav className="nav_bar_links" aria-label="Main navigation">
              <a
                className="nav-btn active"
                href="#home"
                onClick={closeMenu}
              >
                <span className="nav-btn_number">01</span>
                <span className="nav-btn_content">
                  <i className="fa-solid fa-house-chimney"></i>
                  <span>HOME</span>
                </span>
                <span className="nav-btn_arrow">↗</span>
              </a>

              <a
                className="nav-btn"
                href="#about"
                onClick={closeMenu}
              >
                <span className="nav-btn_number">02</span>
                <span className="nav-btn_content">
                  <i className="fa-regular fa-address-card"></i>
                  <span>ABOUT</span>
                </span>
                <span className="nav-btn_arrow">↗</span>
              </a>

              <a
                className="nav-btn"
                href="#portfolios"
                onClick={closeMenu}
              >
                <span className="nav-btn_number">03</span>
                <span className="nav-btn_content">
                  <i className="fa-solid fa-folder-tree"></i>
                  <span>PORTFOLIO</span>
                </span>
                <span className="nav-btn_arrow">↗</span>
              </a>

              <a
                className="nav-btn"
                href="#services"
                onClick={closeMenu}
              >
                <span className="nav-btn_number">04</span>
                <span className="nav-btn_content">
                  <i className="fa-solid fa-sliders"></i>
                  <span>SERVICES</span>
                </span>
                <span className="nav-btn_arrow">↗</span>
              </a>

              {user && (
                <>
                  <div className="navbar_divider"></div>

                  <a
                    className="nav-btn nav-btn_admin"
                    href="/admin"
                    onClick={closeMenu}
                  >
                    <span className="nav-btn_number">05</span>
                    <span className="nav-btn_content">
                      <i className="fa-solid fa-lock"></i>
                      <span>ADMIN</span>
                    </span>
                    <span className="nav-btn_arrow">↗</span>
                  </a>

                  <button
                    className="nav-btn nav-btn_logout"
                    type="button"
                    onClick={handleLogout}
                  >
                    <span className="nav-btn_number">06</span>
                    <span className="nav-btn_content">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>LOGOUT</span>
                    </span>
                    <span className="nav-btn_arrow">↗</span>
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Bottom Area */}
          <div className="navbar_bottom">
            <div className="navbar_bottom_top">
              <span className="navbar_bottom_label">LET'S CONNECT</span>
              <span className="navbar_bottom_mark">✦</span>
            </div>

            <div className="wrapper">
              <a
                href="http://linkedin.com/in/priestly-bassey-486278175"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="social_icon_tooltip">LinkedIn</span>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a
                href="https://twitter.com/priestlythedon"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <span className="social_icon_tooltip">Twitter</span>
                <i className="fa-brands fa-x-twitter"></i>
              </a>

              <a
                href="https://github.com/Priestlyb"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="social_icon_tooltip">GitHub</span>
                <i className="fa-brands fa-github"></i>
              </a>
            </div>

            <p className="navbar_copyright">
              © {new Date().getFullYear()} Priestly Patrick Bassey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;