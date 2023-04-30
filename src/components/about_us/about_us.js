import React from 'react'
import './about_us.css'
import me from './me.png'

function Aboutus() {
  return (
    <div className='container about' id='about'>
      <div className='row about_row'>
        {/* <div className='about-col col-lg-6'>

          <div className="card">

            <div className="item item--1">
            <img src={me} alt='' className='about_img' />
            </div>

            <div className="item item--2">
            <img src={me} alt='' className='about_img' />
            </div>

            <div className="item item--3">
            <img src={me} alt='' className='about_img' />
            </div>

            <div className="item item--4">
            <img src={me} alt='' className='about_img' />
            </div>

          </div>

        </div> */}
        <div className='about_col col-lg-10'>

          <h1 className='about-title'>ABOUT ME.</h1>
          <p>"As a skilled front-end developer with over 3 years of experience, I specialize in building responsive, user-friendly websites and apps using technologies such as React, HTML, CSS, and JavaScript. My portfolio showcases a range of projects that demonstrate my expertise in web development and my ability to deliver high-quality, visually stunning websites.
            <br /><br />
            I have a strong understanding of SEO best practices and I always strive to create websites that are not only visually appealing, but also optimized for search engines. My skills include React, HTML, CSS, JavaScript, and a bit of Node.js.
            <br /><br />
            I am always eager to learn new technologies and stay up-to-date with the latest developments in the web development industry. I am currently working on a project that uses Redux and I'm excited to continue to develop my skills and grow my career as a front-end developer. If you're interested in working together.</p>

        </div>
      </div>
    </div>
  )
}

export default Aboutus;