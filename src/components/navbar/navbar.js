import React from 'react'
import "./navbar.css"
import dp from './it-developer.gif'

function Navbar() {
  return (
    <nav className='sidebar navbar navbar-expand-md' id='navbar'>

        <div className="switch" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <input type="checkbox" />
    <div>
        <span className="line-1"></span>
        <span className="line-2"></span>
        <span className="line-3"></span>
    </div>
</div>

            <div className="navbar_cover collapse navbar-collapse" data-bs-dismiss="navbarNav" aria-label="Close" id="navbarNav">
                <div className='my-bg'></div>
            <img src={dp} alt='My Face' className='my-face'/>
            
        <nav className="nav flex-column">
            <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-0.5s animate__slower active" aria-current="page" href="#home"><i className="fa-solid fa-house-chimney"></i> HOME</a>
            <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-1s animate__slower" href="#about"><i className="fa-regular fa-address-card"></i> ABOUT ME</a>
            <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-2s animate__slower" href='#portfolios'><i className="fa-solid fa-folder-tree"></i> PORTFOLIO</a>
            <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-3s animate__slower" href="#services"><i className="fa-solid fa-sliders"></i> SERVICES <i className="bi bi-house-door"></i></a>
            {/* <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-4s animate__slower"><i className="fa-brands fa-blogger-b"></i> BLOGS</a>
            <a className="nav-link animate__animated animate__lightSpeedInLeft animate__delay-5s animate__slower" href='#contact'><i className="fa-solid fa-map-location-dot"></i> CONTACT ME</a> */}
            
        </nav>

            <ul className="wrapper">
    <li className="icon facebook">
        <a href='http://linkedin.com/in/priestly-bassey-486278175' className='social_icon' target='blank'>
        <span className="tooltip">Linkedin</span>
        <span><i className="animate__animated animate__slow animate__rotateIn animate__infinite fa-brands fa-linkedin-in"></i></span>
        </a>
    </li>
    <li className="icon twitter">
        <a href='https://twitter.com/priestlythedon' className='social_icon' target='blank'>
        <span className="tooltip">Twitter</span>
        <span><i className="fab fa-twitter"></i></span>
        </a>
    </li>
    <li className="icon github">
        <a href='https://github.com/Priestlyb' className='social_icon' target='blank'>
        <span className="tooltip">Github</span>
        <span>
            <i className="animate__animated animate__slow animate__rotateIn animate__infinite fa-brands fa-github"></i></span>
            </a>
    </li>
    <li className="icon instagram">
        <a href='https://www.instagram.com/gemini_loner/' className='social_icon' target='blank'>
        <span className="tooltip">Instagram</span>
        <span><i className="fab fa-instagram"></i></span>
        </a>
    </li>
</ul>
</div>

    </nav>
  )
}

export default Navbar;