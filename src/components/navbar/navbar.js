import React, { useContext } from "react";
import {
  Menu,
  House,
  Contact,
  FolderTree,
  SlidersHorizontal,
  Lock,
  LogOut,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Github,
  Sparkles,
} from "lucide-react";
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
      const instance = window.bootstrap.Offcanvas.getInstance(offcanvasElement);

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
          <Menu size={22} strokeWidth={2} aria-hidden="true" />
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
              {/* HOME */}
              <a className="nav-btn active" href="#home" onClick={closeMenu}>
                <span className="nav-btn_number">01</span>

                <span className="nav-btn_content">
                  <House size={18} strokeWidth={2} aria-hidden="true" />
                  <span>HOME</span>
                </span>

                <span className="nav-btn_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>

              {/* ABOUT */}
              <a className="nav-btn" href="#about" onClick={closeMenu}>
                <span className="nav-btn_number">02</span>

                <span className="nav-btn_content">
                  <Contact size={18} strokeWidth={2} aria-hidden="true" />
                  <span>ABOUT</span>
                </span>

                <span className="nav-btn_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>

              {/* PORTFOLIO */}
              <a className="nav-btn" href="#portfolios" onClick={closeMenu}>
                <span className="nav-btn_number">03</span>

                <span className="nav-btn_content">
                  <FolderTree size={18} strokeWidth={2} aria-hidden="true" />
                  <span>PORTFOLIO</span>
                </span>

                <span className="nav-btn_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>

              {/* SERVICES */}
              <a className="nav-btn" href="#services" onClick={closeMenu}>
                <span className="nav-btn_number">04</span>

                <span className="nav-btn_content">
                  <SlidersHorizontal
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>SERVICES</span>
                </span>

                <span className="nav-btn_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>

              {/* ADMIN + LOGOUT */}
              {user && (
                <>
                  <div className="navbar_divider"></div>

                  {/* ADMIN */}
                  <a
                    className="nav-btn nav-btn_admin"
                    href="/admin"
                    onClick={closeMenu}
                  >
                    <span className="nav-btn_number">05</span>

                    <span className="nav-btn_content">
                      <Lock size={18} strokeWidth={2} aria-hidden="true" />
                      <span>ADMIN</span>
                    </span>

                    <span className="nav-btn_arrow">
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </a>

                  {/* LOGOUT */}
                  <button
                    className="nav-btn nav-btn_logout"
                    type="button"
                    onClick={handleLogout}
                  >
                    <span className="nav-btn_number">06</span>

                    <span className="nav-btn_content">
                      <LogOut size={18} strokeWidth={2} aria-hidden="true" />
                      <span>LOGOUT</span>
                    </span>

                    <span className="nav-btn_arrow">
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Bottom Area */}
          <div className="navbar_bottom">
            <div className="navbar_bottom_top">
              <span className="navbar_bottom_label">LET'S CONNECT</span>

              <span className="navbar_bottom_mark" aria-hidden="true">
                <Sparkles size={16} strokeWidth={2} />
              </span>
            </div>

            <div className="wrapper">
              {/* LinkedIn */}
              <a
                href="http://linkedin.com/in/priestly-bassey-486278175"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="social_icon_tooltip">LinkedIn</span>

                <Linkedin size={19} strokeWidth={2} aria-hidden="true" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/priestlythedon"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <span className="social_icon_tooltip">Twitter</span>

                <Twitter size={19} strokeWidth={2} aria-hidden="true" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Priestlyb"
                className="social_icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="social_icon_tooltip">GitHub</span>

                <Github size={19} strokeWidth={2} aria-hidden="true" />
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
