import React, { useContext, useEffect } from "react";
import Homepage from "./components/homepage";
import { Routes, Route } from "react-router-dom";

import PortfolioUpdate from "./components/portfolio/portfolioUpdate";
import AddProject from "./components/add_project/add_project";
import Portfolios from "./components/portfolio/portfolios";
import PortfolioPage from "./page/portfoliopage/portfoliopage";

import Login from "./page/login/Login";
import AdminPage from "./admin/admin-page";
import { Context } from "./context/Context";

import Register from "./page/register/Register";
import Aos from "aos";
import UserProfile from "./page/user-profile/UserProfile";

/* EXPERIENCE MANAGEMENT */
import AddExperience from "./page/experience/add-experience";
import EditExperience from "./page/experience/edit-experience";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      delay: 100,
    });
  }, []);

  const { user } = useContext(Context);

  return (
    <>
      <Routes>
        {/* =========================================
            PUBLIC ROUTES
        ========================================= */}

        <Route path="/" exact element={<Homepage />} />

        <Route path="/userProfile/:id" exact element={<UserProfile />} />

        <Route path="/register" element={<Register />} />

        <Route path="/portfolioUpdate/:id" element={<PortfolioUpdate />} />

        <Route path="/portfolios" element={<Portfolios />} />

        <Route path="/portfolio/:id" element={<PortfolioPage />} />

        {/* =========================================
            ADMIN
        ========================================= */}

        <Route path="/admin" element={user ? <AdminPage /> : <Login />} />

        {/* =========================================
            PROJECT MANAGEMENT
        ========================================= */}

        <Route
          path="/admin"
          element={user ? <AddProject /> : <Login />}
          exact
        />

        {/* =========================================
            EXPERIENCE MANAGEMENT
        ========================================= */}

        <Route
          path="/admin/experience/add"
          element={user ? <AddExperience /> : <Login />}
        />

        <Route
          path="/admin/experience/edit/:id"
          element={user ? <EditExperience /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
