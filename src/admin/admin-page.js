import { useState, useEffect, useContext } from "react";
import "./admin.css";
import Adminsingle from "./admin-single";
import { axiosInstance } from "../config";
import { Context } from "../context/Context";

export default function Adminpage() {
  const [portfolios, setPortfolios] = useState();
  const [search] = useState("");
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const fetchHandler = async () => {
    try {
      const res = await axiosInstance.get("/portfolios", {
        withCredentials: true,
      });
      setPortfolios(res.data.portfolios);
    } catch (err) {
      console.error("Failed to fetch portfolios:", err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      <div className="admin_page">
        <h1 className="edu-title">WEB DEVELOPMENT DATA.</h1>

        <a href="/para32satalaya" className="admin_add_btn">
          <button className="admin_btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
            <span>Add</span>
          </button>
        </a>

        <div className="portfolio_item">
          {portfolios &&
            portfolios
              .filter((portfolio) =>
                search.toLowerCase() === ""
                  ? portfolio
                  : portfolio.name.toLowerCase().includes(search)
              )
              .map((portfolio, id) => (
                <div key={id}>
                  <Adminsingle portfolio={portfolio} />
                </div>
              ))}
        </div>
      </div>

      <div className="admin_nav_bar">
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
          <i className="fa-solid fa-bars-staggered"></i>
        </button>

        <div
          className="offcanvas offcanvas-start offcanvascustom-width"
          tabIndex="-1"
          id="offcanvastop"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body large">
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-0.5s animate__slower active"
              href="/"
            >
              <i className="fa-solid fa-house-chimney"></i> Home
            </a>

            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-0.5s animate__slower active"
              href="/userProfile/:id"
            >
              <i className="fa-solid fa-user-tie"></i> User Profile
            </a>
            <a
              className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
              href="#services"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i> {user && "LOGOUT"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
