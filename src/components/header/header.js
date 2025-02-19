import React from 'react';
import './header.css';
import Cv from './Priestly`s_Curriculum_Vitae.pdf';
import { useState, useEffect } from "react";

function Header() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [, setIndex] = useState(1);
  const toRotate = ["UI/UX Designer", "WordPress Developer", "Front-end Developer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <div className='header' id='home'>
          <h4>Hi there, I am</h4>
          <h1>{`Priestly Patrick Bassey`} <br />
            <span className="txt-rotate" dataperiod="2000" data-rotate='[ "UI/UX Designer", "WordPress Developer", "Front-end Developer" ]'><span className="wrap">{text}</span></span>
          </h1>
          <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores.</p>
          
          <a href={Cv} download='Priestly`s Curriculum Vitae' className='download_btn'>
            <button className="buttonDownload">Curriculum Vitae</button>
            </a>
    </div>
  )
}

export default Header;