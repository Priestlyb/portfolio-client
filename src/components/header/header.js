import React, { useEffect, useState } from "react";
import "./header.css";
import Cv from "./Priestly`s_Curriculum_Vitae.pdf";

function Header() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const toRotate = [
    "UI/UX Designer",
    "WordPress Developer",
    "Full-Stack Developer",
  ];

  const period = 2000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delta, isDeleting]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];

    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
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

  return (
    <header className="header" id="home">
      <div className="header_content">
        <div className="header_intro">
          <span className="header_line"></span>

          <h4>Hi there, I am</h4>
        </div>

        <h1 className="header_title">
          Priestly Patrick Bassey
          <br />
          <span className="header_role">
            <span className="header_role_text">{text}</span>
            <span className="typing_cursor"></span>
          </span>
        </h1>

        <p className="header_description">
          I design and develop digital experiences for customers of all sizes,
          specializing in stylish, modern websites, web applications, and online
          stores.
        </p>

        <div className="header_actions">
          <a
            href={Cv}
            download="Priestly's Curriculum Vitae"
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
