import React, { useContext, useEffect, useState } from "react";
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

const NAVIGATION_ITEMS = [
  { id: "home", label: "HOME", href: "#home", number: "01", Icon: House },
  { id: "about", label: "ABOUT", href: "#about", number: "02", Icon: Contact },
  {
    id: "portfolios",
    label: "PORTFOLIO",
    href: "#portfolios",
    number: "03",
    Icon: FolderTree,
  },
  {
    id: "services",
    label: "SERVICES",
    href: "#services",
    number: "04",
    Icon: SlidersHorizontal,
  },
];

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const getActiveItem = () => {
    const hash = window.location.hash.replace("#", "").toLowerCase();

    return NAVIGATION_ITEMS.some((item) => item.id === hash) ? hash : "home";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem);

  // Keep the active navigation item synchronized with the URL.
  useEffect(() => {
    const syncActiveItem = () => {
      setActiveItem(getActiveItem());
    };

    window.addEventListener("hashchange", syncActiveItem);

    return () => {
      window.removeEventListener("hashchange", syncActiveItem);
    };
  }, []);

  const closeMenu = () => {
    const offcanvasElement = document.getElementById("offcanvastop");

    if (offcanvasElement && window.bootstrap?.Offcanvas) {
      const instance = window.bootstrap.Offcanvas.getInstance(offcanvasElement);

      instance?.hide();
    }
  };

  const handleNavigation = (id) => {
    setActiveItem(id);
    closeMenu();
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    closeMenu();
  };

  const renderNavigationLink = ({
    id,
    label,
    href,
    number,
    Icon,
    admin = false,
  }) => {
    const isActive = activeItem === id;

    return (
      <a
        key={id}
        className={`nav-btn${isActive ? " active" : ""}${
          admin ? " nav-btn_admin" : ""
        }`}
        href={href}
        onClick={() => handleNavigation(id)}
        aria-current={isActive ? "location" : undefined}
      >
        <span className="nav-btn_number">{number}</span>

        <span className="nav-btn_content">
          <Icon size={18} strokeWidth={2} aria-hidden="true" />
          <span>{label}</span>
        </span>

        <span className="nav-btn_arrow">
          <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
        </span>
      </a>
    );
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
          <div className="navbar_header_shape navbar_header_shape_one" />
          <div className="navbar_header_shape navbar_header_shape_two" />

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
            <span />
            <span />
          </button>
        </div>

        {/* Body */}
        <div className="offcanvas-body navbar_offcanvas_body">
          <div className="navbar_navigation">
            <p className="navbar_navigation_label">NAVIGATION</p>

            <nav className="nav_bar_links" aria-label="Main navigation">
              {NAVIGATION_ITEMS.map((item) => renderNavigationLink(item))}

              {/* Admin and Logout */}
              {user && (
                <>
                  <div className="navbar_divider" />

                  {renderNavigationLink({
                    id: "admin",
                    label: "ADMIN",
                    href: "/admin",
                    number: "05",
                    Icon: Lock,
                    admin: true,
                  })}

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
                href="https://linkedin.com/in/priestly-bassey-486278175"
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
