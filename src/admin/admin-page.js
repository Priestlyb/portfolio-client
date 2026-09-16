import { useState, useEffect, useContext } from "react";
import "../constants/styles/admin.css";
import Adminsingle from "./admin-single";
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
        <div className="admin_summary_item">
          <span className="admin_summary_label">TOTAL PROJECTS</span>
          <strong className="admin_summary_number">
            {loading ? "--" : String(portfolios.length).padStart(2, "0")}
          </strong>
        </div>

        <div className="admin_summary_item">
          <span className="admin_summary_label">STATUS</span>
          <strong className="admin_summary_status">
            <span></span>
            {loading ? "LOADING" : error ? "ERROR" : "ONLINE"}
          </strong>
        </div>

        <div className="admin_summary_item admin_summary_action">
          <a href="/para32satalaya" className="admin_add_btn">
            <button className="admin_btn" type="button">
              <span className="admin_btn_icon">+</span>
              <span>ADD PROJECT</span>
              <span className="admin_btn_arrow">↗</span>
            </button>
          </a>
        </div>
      </section>

      {/* =========================================
          PROJECT HEADER
      ========================================= */}
      <section className="admin_projects_header">
        <div>
          <p>01 — PROJECT DATABASE</p>
          <h2>ALL PROJECTS</h2>
        </div>

        <span>
          {loading
            ? "FETCHING PROJECTS..."
            : `${portfolios.length} PROJECT${portfolios.length === 1 ? "" : "S"}`}
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
            <span className="admin_state_number">!</span>

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
                TRY AGAIN ↗
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

              <a href="/para32satalaya" className="admin_retry">
                CREATE FIRST PROJECT ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer className="admin_footer">
        <span>PRIESTLY PATRICK BASSEY</span>
        <span>ADMIN / PORTFOLIO</span>
        <span>✦ 2026</span>
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
            <i className="fa-solid fa-bars-staggered"></i>
          </span>

          <span>MENU</span>
        </button>

        <div
          className="offcanvas offcanvas-start offcanvascustom-width"
          tabIndex="-1"
          id="offcanvastop"
          aria-labelledby="adminNavigationTitle"
        >
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
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="offcanvas-body admin_offcanvas_body">
            <nav className="admin_navigation">
              <a href="/" className="admin_nav_link">
                <span className="admin_nav_number">01</span>

                <span className="admin_nav_icon">
                  <i className="fa-solid fa-house-chimney"></i>
                </span>

                <span className="admin_nav_text">Home</span>

                <span className="admin_nav_arrow">↗</span>
              </a>

              <Link to={`/userProfile/${user?._id}`} className="admin_nav_link">
                <span className="admin_nav_number">02</span>

                <span className="admin_nav_icon">
                  <i className="fa-solid fa-user-tie"></i>
                </span>

                <span className="admin_nav_text">User Profile</span>

                <span className="admin_nav_arrow">↗</span>
              </Link>

              <button
                type="button"
                className="admin_nav_link admin_logout"
                onClick={handleLogout}
              >
                <span className="admin_nav_number">03</span>

                <span className="admin_nav_icon">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>

                <span className="admin_nav_text">Logout</span>

                <span className="admin_nav_arrow">↗</span>
              </button>
            </nav>

            <div className="admin_offcanvas_bottom">
              <div className="admin_offcanvas_line"></div>

              <div className="admin_offcanvas_identity">
                <span>AUTHENTICATED SESSION</span>

                <strong>{user?.username || user?.name || "ADMIN"}</strong>
              </div>

              <div className="admin_offcanvas_mark">✦</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
