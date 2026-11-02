import React, { useEffect, useMemo, useState } from "react";
import "./header.css";

import Cv from "./Priestly`s_Curriculum_Vitae.pdf";
import { useProfile } from "../../context/ProfileContext";

function Header() {
  const { profile } = useProfile();

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const period = 2000;

  // =========================================
  // DYNAMIC PROFESSIONAL ROLES
  // =========================================

  const toRotate = useMemo(() => {
    return profile?.roles?.length
      ? profile.roles
      : ["UI/UX Designer", "Frontend Developer", "React Native Developer"];
  }, [profile?.roles]);

  // =========================================
  // TYPING ANIMATION
  // =========================================

  useEffect(() => {
    if (!toRotate.length) return;

    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta((prevDelta) => Math.max(prevDelta / 2, 50));
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum((prevLoopNum) => prevLoopNum + 1);
        setDelta(500);
      }
    };

    const ticker = setInterval(tick, delta);

    return () => clearInterval(ticker);
  }, [text, delta, isDeleting, loopNum, toRotate]);

  // =========================================
  // PROFILE DATA
  // =========================================

  const fullName =
    profile?.fullName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Priestly Patrick Bassey";

  const greeting = profile?.greeting || "Hi there, I am";

  const description =
    profile?.heroDescription ||
    "I build modern web and mobile products, working across frontend, backend, and product architecture to turn ideas into reliable, production-ready digital experiences.";

  const cvUrl = profile?.cv?.url || Cv;

  const cvFileName = profile?.cv?.fileName || "Priestly's Curriculum Vitae";

  const isLocalCv = !profile?.cv?.url;

  // =========================================
  // RENDER
  // =========================================

  return (
    <header className="header" id="home">
      <div className="header_content">
        <div className="header_intro">
          <span className="header_line"></span>

          <h4>{greeting}</h4>
        </div>

        <h1 className="header_title">
          {fullName}
          <br />

          <span className="header_role">
            <span className="header_role_text">{text}</span>
            <span className="typing_cursor"></span>
          </span>
        </h1>

        <p className="header_description">{description}</p>

        <div className="header_actions">
          <a
            href={cvUrl}
            download={isLocalCv ? true : cvFileName}
            target={isLocalCv ? undefined : "_blank"}
            rel={isLocalCv ? undefined : "noopener noreferrer"}
            className="download_btn"
          >
            <span className="download_icon" aria-hidden="true">
              ↓
            </span>

            <span>Curriculum Vitae</span>
          </a>

          <a href="#about" className="header_about_link">
            <span>Explore my work</span>
            <span className="header_about_arrow">↓</span>
          </a>
        </div>
      </div>

      <div className="header_accent header_accent_one"></div>

      <div className="header_scroll">
        <span>SCROLL</span>
        <div className="scroll_line"></div>
      </div>
    </header>
  );
}

export default Header;
