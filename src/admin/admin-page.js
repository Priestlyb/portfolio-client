import React, { useState, useEffect, useContext } from "react";
import "./admin.css";
import Adminsingle from "./admin-single";
import { axiosInstance } from "../config";
import { Context } from "../context/Context";
import { FaBars, FaTimes } from "react-icons/fa";

function Adminpage() {
  //Axios Request
  const URL = "/portfolios";
  const fetchHandler = async () => {
    return await axiosInstance.get(URL).then((res) => res.data);
  };

  const [portfolios, setPortfolios] = useState();

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  useEffect(() => {
    fetchHandler().then((data) => setPortfolios(data.portfolios));
  }, []);

  const [search] = useState("");
  console.log(search);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="admin_page">
        <h1 className="edu-title">WEB DEVELOPMENT DATA.</h1>

        <a href="/para32satalaya" className="admin_add_btn">
          <button class="admin_btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>
            <span>Add</span>
          </button>
        </a>

        <div className="portfolio_item">
          {portfolios &&
            portfolios
              .filter((portfolio) => {
                return search.toLowerCase() === ""
                  ? portfolio
                  : portfolio.name.toLowerCase().includes(search);
              })
              .map((portfolio, id) => (
                <div key={id}>
                  <Adminsingle portfolio={portfolio} />
                </div>
              ))}
        </div>
      </div>

      <div className="admin_nav_bar">
        <div className="nav-header">
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          <a
            className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-0.5s animate__slower active"
            aria-current="page"
            href="/"
          >
            <i className="fa-solid fa-house-chimney"></i> HOME
          </a>

          <a
            className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
            href="/admin"
          >
            <i class="fa-solid fa-user-tie"></i> {user && "ADMIN"}
          </a>

          <a
            className="nav-btn animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower"
            href="#services"
            onClick={handleLogout}
          >
            {" "}
            <i class="fa-solid fa-right-from-bracket"></i> {user && "LOGOUT"}
          </a>
        </div>
      </div>
    </>
  );
}

export default Adminpage;
