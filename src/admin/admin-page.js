import { useState, useEffect, useContext } from "react";
import {
  Plus,
  ArrowUpRight,
  AlertCircle,
  FolderOpen,
  Briefcase,
  House,
  UserRoundCog,
  LogOut,
  ArrowDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import "../constants/styles/admin.css";
import Adminsingle from "./admin-single";
import ExperienceManagement from "../components/experience-management/ExperienceManagement";
import { axiosInstance } from "../config";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

export default function Adminpage() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  /* =========================================
     FETCH PROJECTS
  ========================================= */

  const fetchHandler = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await axiosInstance.get("/portfolios/admin", {
        withCredentials: true,
      });

      setPortfolios(res.data?.portfolios || []);
    } catch (err) {
      console.error("Failed to fetch portfolios:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  /* =========================================
     DASHBOARD NAVIGATION
  ========================================= */

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="admin_page">
      {/* =========================================
          TOP BAR
      ========================================= */}
      <header className="admin_header">
        <div className="admin_header_left">
          <div className="admin_section_marker">
            <span>ADMIN</span>
            <span>01</span>
          </div>

          <div>
            <p className="admin_eyebrow">PORTFOLIO MANAGEMENT</p>

            <h1 className="admin_title">
              WEB DEVELOPMENT
              <span>DATA.</span>
            </h1>
          </div>
        </div>

        <div className="admin_header_right">
          <div className="admin_user">
            <span className="admin_user_dot"></span>

            <div>
              <span className="admin_user_label">SIGNED IN AS</span>

              <strong>{user?.username || user?.name || "ADMIN"}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          DASHBOARD SUMMARY
      ========================================= */}
      <section className="admin_summary">
        {/* TOTAL PROJECTS */}
        <div className="admin_summary_item">
          <span className="admin_summary_label">TOTAL PROJECTS</span>

          <strong className="admin_summary_number">
            {loading ? "--" : String(portfolios.length).padStart(2, "0")}
          </strong>
        </div>

        {/* STATUS */}
        <div className="admin_summary_item">
          <span className="admin_summary_label">STATUS</span>

          <strong className="admin_summary_status">
            <span></span>

            {loading ? "LOADING" : error ? "ERROR" : "ONLINE"}
          </strong>
        </div>

        {/* ADD PROJECT */}
        <div className="admin_summary_item admin_summary_action">
          <a href="/admin" className="admin_add_btn">
            <button className="admin_btn" type="button">
              <span className="admin_btn_icon">
                <Plus size={18} strokeWidth={2} />
              </span>

              <span>ADD PROJECT</span>

              <span className="admin_btn_arrow">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </button>
          </a>
        </div>
      </section>

      {/* =========================================
          PROJECT HEADER
      ========================================= */}
      <section id="projects" className="admin_projects_header">
        <div>
          <p>01 — PROJECT DATABASE</p>

          <h2>ALL PROJECTS</h2>
        </div>

        <span>
          {loading
            ? "FETCHING PROJECTS..."
            : `${portfolios.length} PROJECT${
                portfolios.length === 1 ? "" : "S"
              }`}
        </span>
      </section>

      {/* =========================================
          PROJECTS
      ========================================= */}
      <section className="admin_projects">
        {loading ? (
          <div className="admin_loading">
            <div className="admin_loading_line"></div>

            <span>LOADING PROJECT DATABASE...</span>
          </div>
        ) : error ? (
          <div className="admin_state">
            <span className="admin_state_number">
              <AlertCircle size={22} strokeWidth={2} />
            </span>

            <div>
              <h3>Unable to load projects.</h3>

              <p>
                Something went wrong while retrieving the portfolio database.
              </p>

              <button
                type="button"
                className="admin_retry"
                onClick={fetchHandler}
              >
                <span>TRY AGAIN</span>

                <ArrowUpRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        ) : portfolios.length > 0 ? (
          <div className="portfolio_item">
            {portfolios.map((portfolio, index) => (
              <div
                className="admin_project_wrapper"
                key={portfolio._id || index}
              >
                <div className="admin_project_index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <Adminsingle portfolio={portfolio} />
              </div>
            ))}
          </div>
        ) : (
          <div className="admin_state admin_empty">
            <span className="admin_state_number">00</span>

            <div>
              <h3>No projects yet.</h3>

              <p>
                Your portfolio database is currently empty. Add your first
                project to get started.
              </p>

              <a href="/admin" className="admin_retry">
                <span>CREATE FIRST PROJECT</span>

                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* =========================================
          EXPERIENCE MANAGEMENT
      ========================================= */}
      <section id="experience">
        <ExperienceManagement />
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer className="admin_footer">
        <span>PRIESTLY PATRICK BASSEY</span>

        <span>ADMIN / PORTFOLIO</span>

        <span className="admin_footer_mark">
          <Sparkles size={15} strokeWidth={2} />
          <span>2026</span>
        </span>
      </footer>

      {/* =========================================
          ADMIN NAVIGATION
      ========================================= */}
      <div className="admin_nav_bar">
        <button
          className="admin_menu_trigger"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvastop"
          aria-controls="offcanvastop"
          aria-label="Open admin navigation"
        >
          <span className="admin_menu_icon">
            <Menu size={20} strokeWidth={2} />
          </span>

          <span>MENU</span>
        </button>

        <div
          className="offcanvas offcanvas-start offcanvascustom-width"
          tabIndex="-1"
          id="offcanvastop"
          aria-labelledby="adminNavigationTitle"
        >
          {/* OFFCANVAS HEADER */}
          <div className="admin_offcanvas_header">
            <div>
              <span className="admin_offcanvas_label">ADMIN</span>

              <h2 id="adminNavigationTitle">CONTROL.</h2>
            </div>

            <button
              type="button"
              className="admin_close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span>
                <X size={20} strokeWidth={2} />
              </span>

              <span></span>
            </button>
          </div>

          {/* OFFCANVAS BODY */}
          <div className="offcanvas-body admin_offcanvas_body">
            <nav className="admin_navigation">
              {/* PROJECTS */}
              <button
                type="button"
                className="admin_nav_link admin_nav_button"
                onClick={() => scrollToSection("projects")}
                data-bs-dismiss="offcanvas"
              >
                <span className="admin_nav_number">01</span>

                <span className="admin_nav_icon">
                  <FolderOpen size={19} strokeWidth={2} />
                </span>

                <span className="admin_nav_text">Projects</span>

                <span className="admin_nav_arrow">
                  <ArrowDown size={18} strokeWidth={2} />
                </span>
              </button>

              {/* EXPERIENCE */}
              <button
                type="button"
                className="admin_nav_link admin_nav_button"
                onClick={() => scrollToSection("experience")}
                data-bs-dismiss="offcanvas"
              >
                <span className="admin_nav_number">02</span>

                <span className="admin_nav_icon">
                  <Briefcase size={19} strokeWidth={2} />
                </span>

                <span className="admin_nav_text">Experience</span>

                <span className="admin_nav_arrow">
                  <ArrowDown size={18} strokeWidth={2} />
                </span>
              </button>

              {/* HOME */}
              <a href="/" className="admin_nav_link">
                <span className="admin_nav_number">03</span>

                <span className="admin_nav_icon">
                  <House size={19} strokeWidth={2} />
                </span>

                <span className="admin_nav_text">Home</span>

                <span className="admin_nav_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </a>

              {/* USER PROFILE */}
              <Link to={`/userProfile/${user?._id}`} className="admin_nav_link">
                <span className="admin_nav_number">04</span>

                <span className="admin_nav_icon">
                  <UserRoundCog size={19} strokeWidth={2} />
                </span>

                <span className="admin_nav_text">User Profile</span>

                <span className="admin_nav_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </Link>

              {/* LOGOUT */}
              <button
                type="button"
                className="admin_nav_link admin_logout"
                onClick={handleLogout}
              >
                <span className="admin_nav_number">05</span>

                <span className="admin_nav_icon">
                  <LogOut size={19} strokeWidth={2} />
                </span>

                <span className="admin_nav_text">Logout</span>

                <span className="admin_nav_arrow">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </button>
            </nav>

            {/* OFFCANVAS FOOTER */}
            <div className="admin_offcanvas_bottom">
              <div className="admin_offcanvas_line"></div>

              <div className="admin_offcanvas_identity">
                <span>AUTHENTICATED SESSION</span>

                <strong>{user?.username || user?.name || "ADMIN"}</strong>
              </div>

              <div className="admin_offcanvas_mark">
                <Sparkles size={18} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
