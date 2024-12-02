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
          <p>As a skilled Software Engineer with over 4 years of self development experience, I specialize in building responsive, user-friendly websites using technologies such as HTML, CSS, JavaScript, React, and TypeScript and a bit of Node.js. My portfolio showcases a range of projects that demonstrate my expertise in web development and my ability to deliver high-quality, visually stunning websites. I have a strong understanding of SEO best practices and I always strive to create websites that are not only visually appealing, but also optimized for search engines.</p>

        </div>
      </div>
    </div>
  )
}

export default Aboutus;